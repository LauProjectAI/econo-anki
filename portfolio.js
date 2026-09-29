/**
 * SIMULATEUR DE PORTEFEUILLE VIRTUEL (PAPER TRADING)
 * 
 * Les points XP gagnés lors des révisions sont convertis en monnaie virtuelle (1 pt = 5 € virtuels).
 * Les lycéens peuvent investir cet argent dans des actifs illustrant directement leurs cours :
 * - Actions d'entreprises (GreenTech, BioSanté, AéroMondial)
 * - Obligations souveraines (Bons du Trésor à coupon fixe)
 * - ETF indiciels diversifiés (ETF Monde, ETF Paris 40)
 */

class VirtualPortfolio {
  constructor() {
    this.cash = 1000; // Capital d'amorçage virtuel de départ (1 000 €)
    this.totalEarnedCash = 0;
    this.holdings = {}; // assetId -> { quantity, averageBuyPrice }
    this.history = []; // Transactions
    this.lastTickTime = Date.now();

    // Catalogue des actifs financiers pédagogiques
    this.assets = [
      {
        id: "etf_monde",
        name: "ETF Monde (MSCI World)",
        type: "ETF",
        category: "Diversifié",
        price: 85.50,
        initialPrice: 85.50,
        volatility: 0.008,
        dividendYield: 0.018,
        description: "Panier de plus de 1 500 entreprises de 23 pays développés. Risque modéré grâce à la diversification (Fiche 18 & 19)."
      },
      {
        id: "etf_paris40",
        name: "ETF France 40 (CAC 40)",
        type: "ETF",
        category: "Indice Français",
        price: 74.20,
        initialPrice: 74.20,
        volatility: 0.012,
        dividendYield: 0.032,
        description: "Réplique les 40 champions de l'économie française (LVMH, TotalEnergies, Airbus...). Dividendes attractifs (Fiche 17)."
      },
      {
        id: "action_greentech",
        name: "GreenTech Solaire SA",
        type: "Action",
        category: "Transition Écologique",
        price: 42.00,
        initialPrice: 42.00,
        volatility: 0.025,
        dividendYield: 0.0,
        description: "Entreprise en forte croissance dans les énergies renouvelables. Réinvestit 100 % de ses bénéfices (Fiche 11 & 15)."
      },
      {
        id: "action_biosante",
        name: "BioSanté Laboratories",
        type: "Action",
        category: "Santé & Résilience",
        price: 110.00,
        initialPrice: 110.00,
        volatility: 0.014,
        dividendYield: 0.025,
        description: "Laboratoire pharmaceutique européen stable versant des dividendes réguliers aux actionnaires (Fiche 13 & 15)."
      },
      {
        id: "action_aeromondial",
        name: "AéroMondial Express",
        type: "Action",
        category: "Commerce International",
        price: 28.50,
        initialPrice: 28.50,
        volatility: 0.022,
        dividendYield: 0.02,
        description: "Transporteur aérien et logistique mondiale, très sensible aux cycles de croissance et au commerce international (Fiche 5)."
      },
      {
        id: "oat_france",
        name: "Obligations État France 10 ans",
        type: "Obligation",
        category: "Titre de dette souveraine",
        price: 100.00,
        initialPrice: 100.00,
        volatility: 0.003,
        dividendYield: 0.035,
        description: "Prêt garanti à l'État français. Faible volatilité et coupon annuel garanti de 3,5 % (Fiche 13)."
      }
    ];

    this.priceHistory = {};
    this.assets.forEach(a => {
      this.priceHistory[a.id] = [a.price];
    });
  }

  // Conversion des points XP récents en monnaie virtuelle
  creditPoints(points) {
    const virtualCash = points * 5; // 1 point de révision = 5 € de capital virtuel
    this.cash += virtualCash;
    this.totalEarnedCash += virtualCash;
    return virtualCash;
  }

  // Simulation des fluctuations de cours de marché (mouvement brownien géométrique simple)
  simulateMarketTick() {
    this.assets.forEach(asset => {
      const delta = (Math.random() - 0.49) * asset.volatility;
      let newPrice = asset.price * (1 + delta);
      // Évite les prix négatifs ou aberrants
      newPrice = Math.max(1.0, Math.round(newPrice * 100) / 100);
      asset.price = newPrice;

      if (!this.priceHistory[asset.id]) {
        this.priceHistory[asset.id] = [];
      }
      this.priceHistory[asset.id].push(newPrice);
      if (this.priceHistory[asset.id].length > 20) {
        this.priceHistory[asset.id].shift();
      }
    });

    // Versement éventuel de dividendes / coupons si on possède des parts
    this.distributeDividends();
  }

  distributeDividends() {
    // 5% de chance par tick qu'un dividende soit détaché sur un titre éligible
    if (Math.random() < 0.05) {
      this.assets.forEach(asset => {
        if (asset.dividendYield > 0 && this.holdings[asset.id] && this.holdings[asset.id].quantity > 0) {
          const qty = this.holdings[asset.id].quantity;
          const divPerShare = Math.round(asset.price * (asset.dividendYield / 4) * 100) / 100;
          if (divPerShare > 0) {
            const totalDiv = Math.round(qty * divPerShare * 100) / 100;
            this.cash += totalDiv;
            this.history.unshift({
              date: new Date().toLocaleTimeString(),
              type: "Dividende",
              assetName: asset.name,
              amount: totalDiv,
              detail: `${qty} x ${divPerShare} €`
            });
          }
        }
      });
    }
  }

  // Achat d'actifs
  buy(assetId, quantity) {
    const asset = this.assets.find(a => a.id === assetId);
    if (!asset || quantity <= 0) return { success: false, message: "Quantité invalide" };

    const totalCost = Math.round(asset.price * quantity * 100) / 100;
    if (this.cash < totalCost) {
      return { success: false, message: "Solde virtuel insuffisant !" };
    }

    this.cash = Math.round((this.cash - totalCost) * 100) / 100;

    if (!this.holdings[assetId]) {
      this.holdings[assetId] = { quantity: 0, averageBuyPrice: 0 };
    }

    const current = this.holdings[assetId];
    const totalPreviousCost = current.quantity * current.averageBuyPrice;
    const newQuantity = current.quantity + quantity;
    const newAveragePrice = Math.round(((totalPreviousCost + totalCost) / newQuantity) * 100) / 100;

    this.holdings[assetId] = {
      quantity: newQuantity,
      averageBuyPrice: newAveragePrice
    };

    this.history.unshift({
      date: new Date().toLocaleTimeString(),
      type: "Achat",
      assetName: asset.name,
      amount: -totalCost,
      detail: `${quantity} parts à ${asset.price.toFixed(2)} €`
    });

    return { success: true, message: `Achat de ${quantity} part(s) de ${asset.name} réussi.` };
  }

  // Vente d'actifs
  sell(assetId, quantity) {
    const asset = this.assets.find(a => a.id === assetId);
    const holding = this.holdings[assetId];
    if (!asset || !holding || holding.quantity < quantity || quantity <= 0) {
      return { success: false, message: "Quantité insuffisante à vendre !" };
    }

    const totalRevenue = Math.round(asset.price * quantity * 100) / 100;
    this.cash = Math.round((this.cash + totalRevenue) * 100) / 100;

    holding.quantity -= quantity;
    if (holding.quantity === 0) {
      delete this.holdings[assetId];
    }

    this.history.unshift({
      date: new Date().toLocaleTimeString(),
      type: "Vente",
      assetName: asset.name,
      amount: totalRevenue,
      detail: `${quantity} parts à ${asset.price.toFixed(2)} €`
    });

    return { success: true, message: `Vente de ${quantity} part(s) de ${asset.name} réussie.` };
  }

  // Valeur totale du portefeuille (Liquidités + Titres)
  getTotalValue() {
    let holdingsValue = 0;
    for (const [id, item] of Object.entries(this.holdings)) {
      const asset = this.assets.find(a => a.id === id);
      if (asset && item.quantity > 0) {
        holdingsValue += asset.price * item.quantity;
      }
    }
    return Math.round((this.cash + holdingsValue) * 100) / 100;
  }

  // Plus-value latente globale
  getUnrealizedPnL() {
    let totalInvested = 0;
    let currentHoldingsValue = 0;

    for (const [id, item] of Object.entries(this.holdings)) {
      const asset = this.assets.find(a => a.id === id);
      if (asset && item.quantity > 0) {
        totalInvested += item.averageBuyPrice * item.quantity;
        currentHoldingsValue += asset.price * item.quantity;
      }
    }

    const diff = currentHoldingsValue - totalInvested;
    const pct = totalInvested > 0 ? (diff / totalInvested) * 100 : 0;

    return {
      amount: Math.round(diff * 100) / 100,
      percentage: Math.round(pct * 10) / 10
    };
  }

  // Export / Import
  exportData() {
    return {
      cash: this.cash,
      totalEarnedCash: this.totalEarnedCash,
      holdings: this.holdings,
      history: this.history,
      assetPrices: this.assets.map(a => ({ id: a.id, price: a.price }))
    };
  }

  importData(data) {
    if (data) {
      if (typeof data.cash === 'number') this.cash = data.cash;
      if (typeof data.totalEarnedCash === 'number') this.totalEarnedCash = data.totalEarnedCash;
      if (data.holdings) this.holdings = data.holdings;
      if (data.history) this.history = data.history;
      if (data.assetPrices && Array.isArray(data.assetPrices)) {
        data.assetPrices.forEach(p => {
          const a = this.assets.find(x => x.id === p.id);
          if (a) a.price = p.price;
        });
      }
    }
  }
}

window.virtualPortfolio = new VirtualPortfolio();
