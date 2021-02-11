const Schema = mongoose.Schema;

const entitySchema = new Schema({
    location: {
        type: String,
        default: ""
    },
    Animation: {
        type: String,
        default: ""
    },
}, { discriminatorKey: 'kind' });

const Entity = db.model('Entity', entitySchema);

const TextField = Shape.discriminator('Text',
  new Schema({ 
      font: {
          type: String,
          default: "",
      },
      fontsize: {
          type: Number,
          default: 12,
      },
      colour: {
          type: String,
          default: "",
      },
      content: {
          type: String,
          default: "",
      }
      }));

const  ImgField = Shape.discriminator('Image',
  new Schema({ 
      s3_id : {
        type: String,
        default: "",
      },
      link: {
          type: String,
          default: "",
      },
    }));

const AudField = Shape.discriminator('Audio',
  new Schema({
      s3_id : {
        type: String,
        default: "",
      },
      link: {
          type: String,
          default: ""
      },
  }));

const VidField = Shape.discriminator('Video',
  new Schema({
      s3_id : {
        type: String,
        default: "",
      },
      link: {
          type: String,
          default: ""
      },
  }));