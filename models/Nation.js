import mongoose from 'mongoose';


const OriginalStatsSchema = new mongoose.Schema({
  army: {
    type: Number,
    required: true,
  },
  navy: {
    type: Number,
    required: true,
  },
  moral: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  }
}, { _id: false }); 


const NationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  army: {
    type: Number,
    required: true
  },
  navy: {
    type: Number,
    required: true
  },
  moral: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isLandlocked: {
    type: Boolean,
    required: true,
  },
  currAllies: [{
    name: {
      type: String,
    },
    armyDonate: {
      type: Number,
    },
    navyDonate: {
      type: Number,
    },
    inReturn: {
      type: String,
    },
    army: {
      type: Number,
    },
    navy: {
      type: Number,
    }
  }],
  totalArmy: {
    type: Number,
    required: true
  },
  totalNavy: {
    type: Number,
    required: true
  },
  totalTotal: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
    originalStats: {
    type: OriginalStatsSchema,
    required: true
  }
});

const Nation = mongoose.model('Nation', NationSchema);
export default Nation;