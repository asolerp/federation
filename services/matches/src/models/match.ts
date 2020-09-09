import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'


interface MatchDoc extends mongoose.Document {
  name: string,
  admins: [string],
  date_event: Date,
  event_image: string
  teamA: string,
  teamB: string
}

interface MatchAttrs {
  name: string,
  admins: [string],
  date_event: Date,
  event_image: string
  teamA: string,
  teamB: string
}

interface MatchModel extends mongoose.Model<MatchDoc> {
  build(attrs: MatchAttrs): MatchDoc
}

const matchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    admins: {
      type: [String],
      required: true
    },
    date_event: {
      type: mongoose.Schema.Types.Date,
      required: false
    },
    event_image: {
      type: String,
      required: false
    },
    teamA: {
      type: String,
      required: false
    },
    teamB: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret._v
      }
    }
  }
)

matchSchema.set('versionKey', 'version')
matchSchema.plugin(updateIfCurrentPlugin)

matchSchema.statics.build = (attrs: MatchAttrs) => {
  return new Match(attrs)
}

const Match = mongoose.model<MatchDoc, MatchModel>('Match', matchSchema)

export { Match }