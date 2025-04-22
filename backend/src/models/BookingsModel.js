import { Schema, model } from "mongoose";

const BookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  ltId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
    trim: true,
  },
  monST: {
    type: Number,
    required: true,
    default: -1,
  },
  monET: {
    type: Number,
    required: true,
    default: -1,
  },
  tueST: {
    type: Number,
    required: true,
    default: -1,
  },
  tueET: {
    type: Number,
    required: true,
    default: -1,
  },
  wedST: {
    type: Number,
    required: true,
    default: -1,
  },
  wedET: {
    type: Number,
    required: true,
    default: -1,
  },
  thuST: {
    type: Number,
    required: true,
    default: -1,
  },
  thuET: {
    type: Number,
    required: true,
    default: -1,
  },
  friST: {
    type: Number,
    required: true,
    default: -1,
  },
  friET: {
    type: Number,
    required: true,
    default: -1,
  },
  satST: {
    type: Number,
    required: true,
    default: -1,
	},
  satET: {
    type: Number,
    required: true,
    default: -1,
  },
  sunST: {
    type: Number,
    required: true,
    default: -1,
  },
  sunET: {
    type: Number,
    required: true,
    default: -1,
  },
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	admin1: {
		type: Boolean,
		required: true,
		default: false,
	},
	admin2: {
		type: Boolean,
		required: true,
		default: false,
	},
	admin3: {
		type: Boolean,
		required: true,
		default: false,
	},
	superAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	batch: {
		type: String,
		required: true,
		trim: true,
	},
	it_req: {
		type: Boolean,
		required: true,
		default: false,
	}
});

export default model('bookings', BookingSchema);