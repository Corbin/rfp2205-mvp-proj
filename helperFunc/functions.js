module.exports = {
  getRiskFactor: (spamScore) => {
      switch(true) {
        case spamScore >= 0 && spamScore <= 39: return 'Low Risk';
        break;
        case spamScore >= 40 && spamScore <= 79: return 'Medium Risk';
        break;
        case spamScore >= 80 && spamScore <= 100: return 'High Risk';
        break;
        default: return 'Error';
        break;
      }
  }
}