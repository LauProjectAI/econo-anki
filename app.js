/**
 * APPLICATION PRINCIPALE : CONTRÔLEUR D'INTERFACE & LOGIQUE DE JEU
 * 
 * Orchestre les vues, les contrôles clavier (1, 2, 3, 4, Espace, Entrée),
 * les combos, niveaux, le portefeuille virtuel et le mode sprint 60s.
 */

// Version du schéma de stockage pour garantir la rétro-compatibilité
const STORAGE_SCHEMA_VERSION = "ECONO_ANKI_v1";

class EconoApp {
  constructor() {
    this.srsEngine = new SrsEngine(FLASHCARDS);
    this.portfolio = window.virtualPortfolio;
    this.soundFx = window.soundFx;

    // État persistant
    this.state = {
      version: STORAGE_SCHEMA_VERSION,
      xp: 0,
      level: 1,
      dailyGoal: 30,
      activeModules: [1, 2, 3, 4],
      sprintHighScore: 0,
      streakHistory: {}, // "YYYY-MM-DD" -> true
      reducedMotion: false,
      audioMuted: false
    };

    // État de session active
    this.session = {
      queue: [],
      currentIndex: 0,
      currentCard: null,
      currentQuestionFormat: null, // "mcq" ou "written"
      isFlipped: false,
      combo: 0,
      maxSessionCombo: 0,
      sessionCardsCount: 0,
      sessionCorrectCount: 0,
      sessionXpGained: 0,
      sessionNewAcquired: []
    };

    // État du mode Sprint (60s)
    this.sprint = {
      active: false,
      timer: 60,
      intervalId: null,
      score: 0,
      currentCard: null,
      options: []
    };

    this.init();
  }

  // Initialisation au chargement
  init() {
    this.loadState();
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.renderCalendar30Days();
    this.renderCollectionGrid();
    this.renderFichesCourseView();
    this.updateHeaderStats();
    this.renderDailyRing();
    this.startMarketTickInterval();
  }

  // ==========================================================================
  // PERSISTANCE & GESTION DE L'ÉTAT (LOCALSTORAGE)
  // ==========================================================================

  saveState() {
    try {
      const dataToSave = {
        state: this.state,
        srs: this.srsEngine.exportData(),
        portfolio: this.portfolio.exportData()
      };
      localStorage.setItem(STORAGE_SCHEMA_VERSION, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Erreur de sauvegarde locale:", e);
    }
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_SCHEMA_VERSION);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.state) {
          this.state = Object.assign(this.state, parsed.state);
        }
        if (parsed.srs) {
          this.srsEngine.importData(parsed.srs);
        }
        if (parsed.portfolio) {
          this.portfolio.importData(parsed.portfolio);
        }
      }
    } catch (e) {
      console.warn("Restauration impossible, initialisation fraîche:", e);
    }

    if (this.state.reducedMotion) {
      document.body.classList.add('reduced-motion');
    }
  }

  // ==========================================================================
  // SYSTÈME DE POINTS, NIVEAUX & COMBOS
  // ==========================================================================

  getComboMultiplier() {
    if (this.session.combo >= 20) return 3.0;
    if (this.session.combo >= 10) return 2.5;
    if (this.session.combo >= 5) return 2.0;
    if (this.session.combo >= 3) return 1.5;
    return 1.0;
  }

  addExperience(basePoints) {
    const mult = this.getComboMultiplier();
    const pointsToAdd = Math.round(basePoints * mult);

    const oldLevel = Math.floor(this.state.xp / 500) + 1;
    this.state.xp += pointsToAdd;
    const newLevel = Math.floor(this.state.xp / 500) + 1;

    // Conversion en monnaie virtuelle pour le simulateur de portefeuille (1 pt = 5 €)
    this.portfolio.creditPoints(pointsToAdd);

    this.session.sessionXpGained += pointsToAdd;
    this.updateHeaderStats();

    // Déclenchement du passage de niveau
    if (newLevel > oldLevel) {
      this.state.level = newLevel;
      this.triggerLevelUp(newLevel);
    }

    this.saveState();
    return pointsToAdd;
  }

  triggerLevelUp(levelNum) {
    this.soundFx.playLevelUp();
    const modal = document.getElementById('level-up-modal');
    const numDisplay = document.getElementById('level-up-num-display');
    if (modal && numDisplay) {
      numDisplay.textContent = levelNum;
      modal.classList.add('active');
      setTimeout(() => {
        modal.classList.remove('active');
      }, 1500); // 1.5 seconde exactement
    }
  }

  // Mise à jour visuelle des paliers de combo
  updateComboVisuals() {
    const comboEl = document.getElementById('session-combo-badge');
    const comboNum = document.getElementById('session-combo-val');
    const comboMult = document.getElementById('session-combo-mult');
    const cardWrapper = document.getElementById('flashcard-wrapper');

    if (!comboEl || !comboNum || !comboMult) return;

    comboNum.textContent = this.session.combo;
    const mult = this.getComboMultiplier();
    comboMult.textContent = `x${mult}`;

    // Nettoyage des classes
    comboEl.classList.remove('combo-tier-1', 'combo-tier-2');
    if (cardWrapper) cardWrapper.classList.remove('combo-glow');
    document.body.classList.remove('combo-pulse-active');

    // Palier 3 : Contour de la carte illuminé
    if (this.session.combo >= 3) {
      comboEl.classList.add('combo-tier-1');
      if (cardWrapper) cardWrapper.classList.add('combo-glow');
    }

    // Palier 5 : Particules
    if (this.session.combo >= 5) {
      comboEl.classList.add('combo-tier-2');
      this.emitParticles();
    }

    // Palier 10 : Écran vibre brièvement
    if (this.session.combo === 10) {
      if (navigator.vibrate) navigator.vibrate(40);
      const stage = document.getElementById('card-stage');
      if (stage) {
        stage.classList.add('screen-vibrate');
        setTimeout(() => stage.classList.remove('screen-vibrate'), 350);
      }
    }

    // Palier 20 : Fond entier qui pulse
    if (this.session.combo >= 20) {
      document.body.classList.add('combo-pulse-active');
    }
  }

  emitParticles() {
    const badge = document.getElementById('session-combo-badge');
    if (!badge) return;
    const rect = badge.getBoundingClientRect();

    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'sparkle-particle';
      const tx = (Math.random() - 0.5) * 80;
      const ty = (Math.random() - 0.5) * 80;
      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      p.style.left = `${rect.left + rect.width / 2}px`;
      p.style.top = `${rect.top + rect.height / 2}px`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  // ==========================================================================
  // OBJECTIF DU JOUR & SÉRIE DE 30 JOURS
  // ==========================================================================

  markTodayWorked() {
    const today = this.srsEngine.getTodayDateString();
    if (!this.state.streakHistory[today]) {
      this.state.streakHistory[today] = true;
      this.renderCalendar30Days();
      this.saveState();
    }
  }

  renderDailyRing() {
    const ringProgress = document.getElementById('ring-progress-svg');
    const ringCount = document.getElementById('ring-count-display');
    if (!ringProgress || !ringCount) return;

    this.srsEngine.checkDailyReset();
    const count = this.srsEngine.dailyCounts.reviewsCount + this.srsEngine.dailyCounts.newCardsCount;
    const goal = this.state.dailyGoal || 30;

    ringCount.textContent = `${count}/${goal}`;

    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(1, count / goal);
    const offset = circumference - (progress * circumference);

    ringProgress.style.strokeDasharray = `${circumference}`;
    ringProgress.style.strokeDashoffset = `${offset}`;
  }

  renderCalendar30Days() {
    const container = document.getElementById('calendar-30d-container');
    if (!container) return;
    container.innerHTML = '';

    const todayStr = this.srsEngine.getTodayDateString();
    const now = new Date();

    // 30 derniers jours
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      const dayNum = d.getDate();

      const cell = document.createElement('div');
      cell.className = 'cal-day-cell tabular-num';
      cell.textContent = dayNum;

      if (dStr === todayStr) {
        cell.classList.add('today');
      }

      if (this.state.streakHistory[dStr]) {
        cell.classList.add('worked');
      }

      container.appendChild(cell);
    }
  }

  // ==========================================================================
  // VUE 1 : COLLECTION DE VIGNETTES (ACCUEIL)
  // ==========================================================================

  renderCollectionGrid() {
    const grid = document.getElementById('collection-grid-container');
    if (!grid) return;
    grid.innerHTML = '';

    FLASHCARDS.forEach(card => {
      const tier = this.srsEngine.getCardMasteryTier(card.id);
      const state = this.srsEngine.initCardState(card.id);

      const tile = document.createElement('div');
      tile.className = `collection-tile tier-${tier}`;
      tile.setAttribute('data-card-id', card.id);

      let intervalText = "Nouvelle";
      let statusIcon = "⚪";
      if (tier === 1) {
        intervalText = "Apprentissage";
        statusIcon = "🔵";
      } else if (tier === 2) {
        intervalText = `${state.interval} j`;
        statusIcon = "🟢";
      } else if (tier === 3) {
        intervalText = `Mûre (${state.interval} j)`;
        statusIcon = "⭐";
      }

      const mod = MODULES.find(m => m.id === card.moduleId);

      tile.innerHTML = `
        <div class="tile-top">
          <span class="tile-module-pill">M${card.moduleId}</span>
          <span class="tile-status-icon">${statusIcon}</span>
        </div>
        <div class="tile-term">${card.term}</div>
        <div class="tile-interval tabular-num">${intervalText}</div>
      `;

      tile.addEventListener('click', () => {
        this.openFicheModal(card.ficheId);
      });

      grid.appendChild(tile);
    });
  }

  // ==========================================================================
  // VUE 2 : SESSION DE RÉVISION (SRS ANKI)
  // ==========================================================================

  startRevisionSession() {
    this.srsEngine.checkDailyReset();
    const due = this.srsEngine.getDueCards(this.state.activeModules);

    if (due.length === 0) {
      alert("Toutes vos révisions du jour sont terminées pour les thèmes choisis ! Excellent travail. Vous pouvez lancer un Mode Sprint ou consulter le portefeuille virtuel.");
      return;
    }

    this.session = {
      queue: [...due],
      currentIndex: 0,
      currentCard: null,
      currentQuestionFormat: null,
      isFlipped: false,
      combo: 0,
      maxSessionCombo: 0,
      sessionCardsCount: 0,
      sessionCorrectCount: 0,
      sessionXpGained: 0,
      sessionNewAcquired: []
    };

    this.switchView('session');
    this.presentNextCard();
  }

  presentNextCard() {
    if (this.session.currentIndex >= this.session.queue.length) {
      this.finishSession();
      return;
    }

    const card = this.session.queue[this.session.currentIndex];
    this.session.currentCard = card;
    this.session.isFlipped = false;

    const format = this.srsEngine.getQuestionFormat(card.id);
    this.session.currentQuestionFormat = format;

    const wrapper = document.getElementById('flashcard-wrapper');
    if (wrapper) {
      wrapper.className = 'flashcard-wrapper';
      if (this.session.combo >= 3) wrapper.classList.add('combo-glow');
    }

    // Réinitialisation des faces
    this.renderCardFront(card, format);
    this.renderCardBack(card);

    // Mise à jour de la barre de contrôle
    const controlsBar = document.getElementById('review-controls-bar');
    const flipBtn = document.getElementById('btn-show-answer');
    if (controlsBar) controlsBar.style.display = 'none';
    if (flipBtn) flipBtn.style.display = 'flex';

    // Compteurs de session
    const counterDisplay = document.getElementById('session-card-counter');
    if (counterDisplay) {
      counterDisplay.textContent = `${this.session.currentIndex + 1} / ${this.session.queue.length}`;
    }

    this.updateComboVisuals();
  }

  renderCardFront(card, format) {
    const modTag = document.getElementById('card-module-tag');
    const badgeFormat = document.getElementById('card-badge-format');
    const questionText = document.getElementById('card-question-text');
    const interactionZone = document.getElementById('card-interaction-zone');
    const leechBanner = document.getElementById('card-leech-banner');

    const state = this.srsEngine.initCardState(card.id);
    const mod = MODULES.find(m => m.id === card.moduleId);

    if (modTag) modTag.textContent = mod ? mod.title : `Module ${card.moduleId}`;
    if (badgeFormat) badgeFormat.textContent = format === 'mcq' ? "QCM (Carte Neuve)" : "Réponse écrite";
    if (questionText) questionText.textContent = card.question;

    if (leechBanner) {
      leechBanner.style.display = state.isLeech ? 'flex' : 'none';
    }

    if (!interactionZone) return;
    interactionZone.innerHTML = '';

    if (format === 'mcq') {
      const mcqData = this.srsEngine.generateMCQ(card);
      const grid = document.createElement('div');
      grid.className = 'mcq-options-grid';

      mcqData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'mcq-option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          this.handleMCQChoice(btn, opt, card);
        });
        grid.appendChild(btn);
      });

      interactionZone.appendChild(grid);
    } else {
      // Format réponse écrite
      const form = document.createElement('form');
      form.className = 'written-form';
      form.innerHTML = `
        <input type="text" class="written-input" id="written-input-field" placeholder="Tapez le terme économique exact..." autocomplete="off" />
        <button type="submit" class="written-submit-btn">Valider</button>
      `;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('written-input-field');
        if (input) this.handleWrittenSubmit(input.value.trim(), card);
      });

      interactionZone.appendChild(form);

      setTimeout(() => {
        const input = document.getElementById('written-input-field');
        if (input) input.focus();
      }, 100);
    }
  }

  renderCardBack(card) {
    const termDisplay = document.getElementById('card-term-display');
    const defBox = document.getElementById('card-definition-box');
    const exBox = document.getElementById('card-example-box');
    const diffContainer = document.getElementById('card-diff-container');

    if (termDisplay) termDisplay.textContent = card.term;
    if (defBox) defBox.textContent = card.definition;
    if (exBox) exBox.textContent = `💡 Exemple concret : ${card.example}`;
    if (diffContainer) diffContainer.innerHTML = '';
  }

  handleMCQChoice(buttonElement, chosenText, card) {
    const isCorrect = chosenText === card.term;
    const allButtons = document.querySelectorAll('.mcq-option-btn');
    allButtons.forEach(b => b.disabled = true);

    if (isCorrect) {
      buttonElement.classList.add('selected-correct');
    } else {
      buttonElement.classList.add('selected-wrong');
      allButtons.forEach(b => {
        if (b.textContent === card.term) b.classList.add('selected-correct');
      });
    }

    setTimeout(() => {
      this.flipCard();
    }, 400);
  }

  handleWrittenSubmit(userAttempt, card) {
    const result = this.srsEngine.evaluateWrittenAnswer(userAttempt, card);
    const diffContainer = document.getElementById('card-diff-container');

    if (diffContainer && result.diffHighlight) {
      let html = `<div class="diff-title" style="margin-bottom:4px; font-weight:600;">Comparaison avec le terme exact :</div>`;
      result.diffHighlight.forEach(w => {
        html += `<span class="diff-word ${w.matched ? 'matched' : 'diff'}">${w.text}</span> `;
      });
      diffContainer.innerHTML = html;
    }

    this.flipCard();
  }

  flipCard() {
    if (this.session.isFlipped) return;
    this.session.isFlipped = true;

    const wrapper = document.getElementById('flashcard-wrapper');
    if (wrapper) wrapper.classList.add('is-flipped');

    const controlsBar = document.getElementById('review-controls-bar');
    const flipBtn = document.getElementById('btn-show-answer');
    if (controlsBar) controlsBar.style.display = 'grid';
    if (flipBtn) flipBtn.style.display = 'none';

    // Remplissage des prédictions d'intervalle sur les boutons Anki
    this.updateSRSButtonsIntervals(this.session.currentCard.id);
  }

  updateSRSButtonsIntervals(cardId) {
    const state = this.srsEngine.initCardState(cardId);
    const encoreEl = document.getElementById('srs-interval-encore');
    const diffEl = document.getElementById('srs-interval-difficile');
    const corrEl = document.getElementById('srs-interval-correct');
    const facEl = document.getElementById('srs-interval-facile');

    if (state.learningStep < 2 || state.relearning) {
      if (encoreEl) encoreEl.textContent = "1 min";
      if (diffEl) diffEl.textContent = "5 min";
      if (corrEl) corrEl.textContent = state.learningStep === 0 ? "10 min" : "1 j";
      if (facEl) facEl.textContent = "4 j";
    } else {
      if (encoreEl) encoreEl.textContent = "10 min";
      if (diffEl) diffEl.textContent = `${Math.max(1, Math.round(state.interval * 1.2))} j`;
      const corrDays = Math.max(1, Math.round(state.interval * state.easeFactor));
      if (corrEl) corrEl.textContent = `${corrDays} j`;
      const facDays = Math.max(1, Math.round(state.interval * state.easeFactor * 1.3));
      if (facEl) facEl.textContent = `${facDays} j`;
    }
  }

  // Traitement d'un des 4 boutons : 1: Encore, 2: Difficile, 3: Correct, 4: Facile
  handleRating(rating) {
    if (!this.session.isFlipped || !this.session.currentCard) return;

    const card = this.session.currentCard;
    const cardWrapper = document.getElementById('flashcard-wrapper');
    const isSuccess = rating >= 2;

    this.session.sessionCardsCount += 1;
    this.markTodayWorked();

    // Calcul du moteur SRS Anki
    const { state } = this.srsEngine.rateCard(card.id, rating);

    if (isSuccess) {
      this.soundFx.playCorrect();
      this.session.sessionCorrectCount += 1;
      this.session.combo += 1;
      if (this.session.combo > this.session.maxSessionCombo) {
        this.session.maxSessionCombo = this.session.combo;
      }

      // Points d'expérience de base : 10 multipliés par le combo
      this.addExperience(10);

      // Si la carte vient de graduer (interval >= 1)
      if (state.interval >= 1 && !this.session.sessionNewAcquired.includes(card.term)) {
        this.session.sessionNewAcquired.push(card.term);
      }

      // Animation fluide de sortie vers la droite
      if (cardWrapper) {
        cardWrapper.classList.add('exit-correct');
      }
    } else {
      // Échec : Encore
      this.soundFx.playWrong();
      this.session.combo = 0; // Combo retombe à zéro immédiatement

      // Si échec en apprentissage, la carte est réinsérée en fin de file
      this.session.queue.push(card);

      // Animation de secousse sur place
      if (cardWrapper) {
        cardWrapper.classList.add('shake-wrong');
      }
    }

    this.updateComboVisuals();
    this.renderDailyRing();
    this.saveState();

    // Transition vers la prochaine carte après l'animation
    setTimeout(() => {
      this.session.currentIndex += 1;
      this.presentNextCard();
    }, 450);
  }

  // ==========================================================================
  // VUE 3 : ÉCRAN DE FIN DE SESSION (COMPTEURS QUI DÉFILENT)
  // ==========================================================================

  finishSession() {
    this.switchView('summary');

    const cardsSeenEl = document.getElementById('sum-cards-seen');
    const successRateEl = document.getElementById('sum-success-rate');
    const pointsGainedEl = document.getElementById('sum-points-gained');
    const longestComboEl = document.getElementById('sum-longest-combo');
    const cashEarnedEl = document.getElementById('sum-cash-earned');
    const acquiredList = document.getElementById('sum-new-acquired-pills');

    const totalSeen = this.session.sessionCardsCount;
    const successRate = totalSeen > 0 ? Math.round((this.session.sessionCorrectCount / totalSeen) * 100) : 100;
    const points = this.session.sessionXpGained;
    const maxCombo = this.session.maxSessionCombo;
    const cashEarned = points * 5;

    // Animation de défilement ascendant des chiffres
    this.animateRollingCounter(cardsSeenEl, totalSeen, 800);
    this.animateRollingCounter(successRateEl, successRate, 1000, "%");
    this.animateRollingCounter(pointsGainedEl, points, 1200);
    this.animateRollingCounter(longestComboEl, maxCombo, 800);
    this.animateRollingCounter(cashEarnedEl, cashEarned, 1200, " €");

    if (acquiredList) {
      acquiredList.innerHTML = '';
      if (this.session.sessionNewAcquired.length === 0) {
        acquiredList.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted)">Aucun nouveau terme gradué durant cette session.</span>`;
      } else {
        this.session.sessionNewAcquired.forEach(term => {
          const pill = document.createElement('span');
          pill.className = 'new-pill';
          pill.textContent = term;
          acquiredList.appendChild(pill);
        });
      }
    }

    this.renderCollectionGrid();
  }

  animateRollingCounter(element, targetValue, duration = 1000, suffix = "") {
    if (!element) return;
    if (this.state.reducedMotion) {
      element.textContent = `${targetValue}${suffix}`;
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (targetValue - start) * easeOut);

      element.textContent = `${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${targetValue}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }

  // ==========================================================================
  // VUE 4 : MODE SPRINT (60 SECONDES)
  // RÈGLE ABSOLUE : NE MODIFIE JAMAIS LES INTERVALLES SRS !
  // ==========================================================================

  startSprint() {
    this.sprint = {
      active: true,
      timer: 60,
      intervalId: null,
      score: 0,
      currentCard: null,
      options: []
    };

    this.switchView('sprint');
    this.updateSprintHUD();

    this.sprint.intervalId = setInterval(() => {
      this.sprint.timer -= 1;
      this.updateSprintHUD();

      if (this.sprint.timer <= 5 && this.sprint.timer > 0) {
        this.soundFx.playSprintTick();
      }

      if (this.sprint.timer <= 0) {
        this.finishSprint();
      }
    }, 1000);

    this.nextSprintQuestion();
  }

  nextSprintQuestion() {
    if (!this.sprint.active) return;

    // Sélection aléatoire d'une carte parmi toutes les fiches
    const card = FLASHCARDS[Math.floor(Math.random() * FLASHCARDS.length)];
    this.sprint.currentCard = card;

    const questionEl = document.getElementById('sprint-question-text');
    const optionsContainer = document.getElementById('sprint-options-grid');

    if (questionEl) questionEl.textContent = card.question;
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    const mcq = this.srsEngine.generateMCQ(card);
    mcq.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        this.handleSprintAnswer(btn, opt, card);
      });
      optionsContainer.appendChild(btn);
    });
  }

  handleSprintAnswer(btn, chosen, card) {
    if (!this.sprint.active) return;
    const isCorrect = chosen === card.term;

    if (isCorrect) {
      btn.classList.add('selected-correct');
      this.soundFx.playCorrect();
      this.sprint.score += 100;
      this.addExperience(15); // Récompense XP sans toucher aux intervalles SRS
    } else {
      btn.classList.add('selected-wrong');
      this.soundFx.playWrong();
    }

    this.updateSprintHUD();

    setTimeout(() => {
      this.nextSprintQuestion();
    }, 250);
  }

  updateSprintHUD() {
    const timerEl = document.getElementById('sprint-timer-val');
    const scoreEl = document.getElementById('sprint-score-val');
    const highScoreEl = document.getElementById('sprint-high-score');

    if (timerEl) {
      timerEl.textContent = `${this.sprint.timer}s`;
      if (this.sprint.timer <= 10) {
        timerEl.classList.add('urgent');
      } else {
        timerEl.classList.remove('urgent');
      }
    }
    if (scoreEl) scoreEl.textContent = this.sprint.score;
    if (highScoreEl) highScoreEl.textContent = this.state.sprintHighScore;
  }

  finishSprint() {
    this.sprint.active = false;
    clearInterval(this.sprint.intervalId);

    if (this.sprint.score > this.state.sprintHighScore) {
      this.state.sprintHighScore = this.sprint.score;
      this.saveState();
    }

    alert(`⏱️ Temps écoulé !\nScore Sprint : ${this.sprint.score} points.\nVotre record : ${this.state.sprintHighScore} points.`);
    this.switchView('collection');
  }

  // ==========================================================================
  // VUE 5 : SIMULATEUR DE PORTEFEUILLE VIRTUEL
  // ==========================================================================

  startMarketTickInterval() {
    // Un tick de fluctuation boursière toutes les 15 secondes
    setInterval(() => {
      this.portfolio.simulateMarketTick();
      if (document.getElementById('view-portfolio')?.classList.contains('active')) {
        this.renderPortfolioView();
      }
    }, 15000);
  }

  renderPortfolioView() {
    const cashVal = document.getElementById('port-cash-val');
    const totalVal = document.getElementById('port-total-val');
    const pnlVal = document.getElementById('port-pnl-val');
    const assetsContainer = document.getElementById('port-assets-list');

    const total = this.portfolio.getTotalValue();
    const pnl = this.portfolio.getUnrealizedPnL();

    if (cashVal) cashVal.textContent = `${this.portfolio.cash.toFixed(2)} €`;
    if (totalVal) totalVal.textContent = `${total.toFixed(2)} €`;
    if (pnlVal) {
      const sign = pnl.amount >= 0 ? "+" : "";
      pnlVal.textContent = `${sign}${pnl.amount.toFixed(2)} € (${sign}${pnl.percentage} %)`;
      pnlVal.style.color = pnl.amount >= 0 ? "var(--state-success)" : "var(--state-danger)";
    }

    if (!assetsContainer) return;
    assetsContainer.innerHTML = '';

    this.portfolio.assets.forEach(asset => {
      const holding = this.portfolio.holdings[asset.id] || { quantity: 0, averageBuyPrice: 0 };
      const currentHoldingValue = holding.quantity * asset.price;

      const row = document.createElement('div');
      row.className = 'asset-row-item';

      row.innerHTML = `
        <div class="asset-title-block">
          <h4>
            ${asset.name}
            <span class="asset-type-badge">${asset.type}</span>
          </h4>
          <div class="asset-desc">${asset.description}</div>
        </div>
        <div class="asset-pricing tabular-num">
          ${asset.price.toFixed(2)} €
        </div>
        <div class="asset-holdings tabular-num">
          <div>Détenu : <strong>${holding.quantity}</strong> parts</div>
          <div style="font-size:0.75rem; color:var(--text-muted)">Valeur : ${currentHoldingValue.toFixed(2)} €</div>
        </div>
        <div class="asset-trade-actions">
          <button class="trade-btn trade-btn-buy" data-buy-id="${asset.id}">Acheter 1</button>
          <button class="trade-btn trade-btn-sell" data-sell-id="${asset.id}" ${holding.quantity === 0 ? 'disabled style="opacity:0.5"' : ''}>Vendre 1</button>
        </div>
      `;

      row.querySelector(`[data-buy-id="${asset.id}"]`).addEventListener('click', () => {
        const res = this.portfolio.buy(asset.id, 1);
        if (res.success) {
          this.soundFx.playCorrect();
        } else {
          alert(res.message);
        }
        this.renderPortfolioView();
        this.updateHeaderStats();
        this.saveState();
      });

      row.querySelector(`[data-sell-id="${asset.id}"]`).addEventListener('click', () => {
        const res = this.portfolio.sell(asset.id, 1);
        if (res.success) {
          this.soundFx.playCorrect();
        } else {
          alert(res.message);
        }
        this.renderPortfolioView();
        this.updateHeaderStats();
        this.saveState();
      });

      assetsContainer.appendChild(row);
    });
  }

  // ==========================================================================
  // VUE 6 : FICHES DE COURS PÉDAGOGIQUES (ACCORDÉON)
  // ==========================================================================

  renderFichesCourseView() {
    const container = document.getElementById('fiches-accordion-container');
    if (!container) return;
    container.innerHTML = '';

    FICHES.forEach(fiche => {
      const cardItem = document.createElement('div');
      cardItem.className = 'fiche-card-item';
      cardItem.id = `fiche-item-${fiche.id}`;

      cardItem.innerHTML = `
        <button class="fiche-header-btn">
          <div class="fiche-header-title">
            <span class="fiche-num-badge">${fiche.number}</span>
            <div>
              <strong>${fiche.title}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted)">Module ${fiche.moduleId} : ${fiche.notionCle}</div>
            </div>
          </div>
          <span style="font-size:1.1rem; color:var(--text-muted)">▾</span>
        </button>
        <div class="fiche-content-body">
          <div class="fiche-block-section">
            <div class="fiche-block-title">📖 Résumé essentiel</div>
            <div class="fiche-block-text">${fiche.summary}</div>
          </div>
          <div class="fiche-block-section">
            <div class="fiche-block-title">💡 Exemple du quotidien (Lycéen)</div>
            <div class="fiche-block-text">${fiche.dailyExample}</div>
          </div>
          <div class="fiche-block-section" style="background:rgba(255,182,39,0.08); padding:10px; border-radius:6px;">
            <div class="fiche-block-title" style="color:var(--accent-amber);">🎯 À retenir absolument</div>
            <div class="fiche-block-text" style="color:#FFF;">${fiche.takeaway}</div>
          </div>
        </div>
      `;

      cardItem.querySelector('.fiche-header-btn').addEventListener('click', () => {
        cardItem.classList.toggle('open');
      });

      container.appendChild(cardItem);
    });
  }

  openFicheModal(ficheId) {
    this.switchView('fiches');
    const target = document.getElementById(`fiche-item-${ficheId}`);
    if (target) {
      target.classList.add('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ==========================================================================
  // NAVIGATION INTERNE & CHANGEMENT DE VUE
  // ==========================================================================

  switchView(viewName) {
    // Si sprint était actif et qu'on quitte la vue
    if (this.sprint.active && viewName !== 'sprint') {
      clearInterval(this.sprint.intervalId);
      this.sprint.active = false;
    }

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

    const targetSec = document.getElementById(`view-${viewName}`);
    const targetTab = document.getElementById(`tab-${viewName}`);

    if (targetSec) targetSec.classList.add('active');
    if (targetTab) targetTab.classList.add('active');

    if (viewName === 'portfolio') {
      this.renderPortfolioView();
    } else if (viewName === 'collection') {
      this.renderCollectionGrid();
      this.renderDailyRing();
      this.renderCalendar30Days();
    }
  }

  updateHeaderStats() {
    const xpEl = document.getElementById('header-xp-val');
    const levelEl = document.getElementById('header-level-val');
    const cashEl = document.getElementById('header-cash-val');

    if (xpEl) xpEl.textContent = this.state.xp;
    if (levelEl) levelEl.textContent = `Niv. ${this.state.level}`;
    if (cashEl) cashEl.textContent = `${this.portfolio.cash.toFixed(0)} €`;
  }

  // ==========================================================================
  // CONTRÔLES CLAVIER (1, 2, 3, 4, ESPACE, ENTRÉE) SANS SOURIS
  // ==========================================================================

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const activeSection = document.querySelector('.view-section.active');
      if (!activeSection) return;

      // Si le modal de paramètres est ouvert ou si l'utilisateur tape dans un champ texte de recherche
      if (document.getElementById('settings-modal')?.classList.contains('open')) return;

      if (activeSection.id === 'view-session') {
        const inputField = document.getElementById('written-input-field');
        const isTyping = document.activeElement === inputField;

        // Espace : retourner la carte si elle n'est pas encore retournée
        if (e.code === 'Space' && !isTyping) {
          e.preventDefault();
          if (!this.session.isFlipped) {
            this.flipCard();
          }
          return;
        }

        // Si la carte est retournée, les touches 1, 2, 3, 4 déclenchent les boutons SRS
        if (this.session.isFlipped && !isTyping) {
          if (e.key === '1') {
            e.preventDefault();
            this.handleRating(1);
          } else if (e.key === '2') {
            e.preventDefault();
            this.handleRating(2);
          } else if (e.key === '3') {
            e.preventDefault();
            this.handleRating(3);
          } else if (e.key === '4') {
            e.preventDefault();
            this.handleRating(4);
          }
        }
      }
    });
  }

  // ==========================================================================
  // LISTENERS D'ÉVÉNEMENTS UI
  // ==========================================================================

  setupEventListeners() {
    // Boutons de navigation par onglets
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.getAttribute('data-view');
        this.switchView(view);
      });
    });

    // Boutons principaux d'action sur l'accueil
    document.getElementById('btn-start-revision')?.addEventListener('click', () => {
      this.startRevisionSession();
    });
    document.getElementById('btn-start-sprint')?.addEventListener('click', () => {
      this.startSprint();
    });

    // Retourner la carte
    document.getElementById('btn-show-answer')?.addEventListener('click', () => {
      this.flipCard();
    });

    // 4 boutons d'évaluation SRS
    document.getElementById('btn-srs-encore')?.addEventListener('click', () => this.handleRating(1));
    document.getElementById('btn-srs-difficile')?.addEventListener('click', () => this.handleRating(2));
    document.getElementById('btn-srs-correct')?.addEventListener('click', () => this.handleRating(3));
    document.getElementById('btn-srs-facile')?.addEventListener('click', () => this.handleRating(4));

    // Bouton de fin de session vers l'accueil
    document.getElementById('btn-summary-home')?.addEventListener('click', () => {
      this.switchView('collection');
    });

    // Bouton de coupure du son
    const soundBtn = document.getElementById('btn-toggle-sound');
    soundBtn?.addEventListener('click', () => {
      const muted = this.soundFx.toggleMute();
      soundBtn.textContent = muted ? '🔇' : '🔊';
      soundBtn.title = muted ? 'Son coupé' : 'Son activé';
    });
    if (soundBtn) {
      soundBtn.textContent = this.soundFx.isMuted ? '🔇' : '🔊';
    }

    // Modal de Paramètres
    const settingsModal = document.getElementById('settings-modal');
    document.getElementById('btn-open-settings')?.addEventListener('click', () => {
      this.populateSettingsForm();
      settingsModal?.classList.add('open');
    });
    document.getElementById('btn-close-settings')?.addEventListener('click', () => {
      settingsModal?.classList.remove('open');
    });

    // Paramètre Réduction des animations
    document.getElementById('setting-reduced-motion')?.addEventListener('change', (e) => {
      this.state.reducedMotion = e.target.checked;
      if (this.state.reducedMotion) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
      this.saveState();
    });

    // Paramètre Objectif du jour
    document.getElementById('setting-daily-goal')?.addEventListener('change', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val >= 5 && val <= 150) {
        this.state.dailyGoal = val;
        this.renderDailyRing();
        this.saveState();
      }
    });

    // Exportation des données JSON
    document.getElementById('btn-export-json')?.addEventListener('click', () => {
      this.exportDataJSON();
    });

    // Importation des données JSON
    document.getElementById('btn-import-json')?.addEventListener('click', () => {
      document.getElementById('file-import-input')?.click();
    });
    document.getElementById('file-import-input')?.addEventListener('change', (e) => {
      this.importDataJSON(e.target.files[0]);
    });

    // Remise à zéro complète en deux étapes
    let resetStep = 1;
    const resetBtn = document.getElementById('btn-full-reset');
    resetBtn?.addEventListener('click', () => {
      if (resetStep === 1) {
        resetBtn.textContent = "Êtes-vous ABSOLUMENT certain ? (Cliquer pour confirmer)";
        resetBtn.style.background = "#DC2626";
        resetBtn.style.color = "#FFFFFF";
        resetStep = 2;
        setTimeout(() => {
          resetStep = 1;
          resetBtn.textContent = "Remettre à zéro la progression";
          resetBtn.style.background = "none";
          resetBtn.style.color = "var(--state-danger)";
        }, 5000);
      } else if (resetStep === 2) {
        localStorage.removeItem(STORAGE_SCHEMA_VERSION);
        location.reload();
      }
    });
  }

  populateSettingsForm() {
    const goalInput = document.getElementById('setting-daily-goal');
    const motionToggle = document.getElementById('setting-reduced-motion');
    const modulesContainer = document.getElementById('setting-modules-list');

    if (goalInput) goalInput.value = this.state.dailyGoal || 30;
    if (motionToggle) motionToggle.checked = !!this.state.reducedMotion;

    if (modulesContainer) {
      modulesContainer.innerHTML = '';
      MODULES.forEach(mod => {
        const item = document.createElement('label');
        item.className = 'checkbox-module-item';
        const isChecked = this.state.activeModules.includes(mod.id);

        item.innerHTML = `
          <input type="checkbox" value="${mod.id}" ${isChecked ? 'checked' : ''} />
          <span>Module ${mod.id} : ${mod.title}</span>
        `;

        item.querySelector('input').addEventListener('change', (e) => {
          const id = parseInt(e.target.value, 10);
          if (e.target.checked) {
            if (!this.state.activeModules.includes(id)) this.state.activeModules.push(id);
          } else {
            this.state.activeModules = this.state.activeModules.filter(m => m !== id);
          }
          this.saveState();
        });

        modulesContainer.appendChild(item);
      });
    }
  }

  exportDataJSON() {
    const payload = {
      exportDate: new Date().toISOString(),
      schemaVersion: STORAGE_SCHEMA_VERSION,
      state: this.state,
      srs: this.srsEngine.exportData(),
      portfolio: this.portfolio.exportData()
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `econo-anki-sauvegarde-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importDataJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.state && data.srs) {
          this.state = data.state;
          this.srsEngine.importData(data.srs);
          if (data.portfolio) this.portfolio.importData(data.portfolio);
          this.saveState();
          alert("Importation réussie avec succès !");
          location.reload();
        } else {
          alert("Format de fichier invalide.");
        }
      } catch (err) {
        alert("Erreur lors de la lecture du fichier JSON.");
      }
    };
    reader.readAsText(file);
  }
}

// Démarrage de l'application
document.addEventListener('DOMContentLoaded', () => {
  window.app = new EconoApp();
});
