const Fs = require("fs");
const tf = require("@tensorflow/tfjs-node");

var sa = null;

// https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json
class SentimentAnalysis {
    constructor(modelUrl, metaPath) {
        this.model = modelUrl;
        this.metadata = metaPath;
        this.PAD_INDEX = 0;
        this.OOV_INDEX = 2;
        this.SentimentThreshold = {
            Positive: 0.66,
            Neutral: 0.33,
            Negative: 0
        }
    }

    async setup () {
        console.log("SETTING UP SENTIMENT MODEL")
        this.model = await tf.loadLayersModel(this.model);
        this.metadata = JSON.parse(Fs.readFileSync(this.metadata))
        console.log("Done loading sentiment model")
    }

    getSentiment = text => {
        const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').split(' ');
        // Convert the words to a sequence of word indices.
        const sequence = inputText.map(word => {
          if (!this.metadata.word_index[word]) return this.OOV_INDEX;
          
          let wordIndex = this.metadata.word_index[word] + this.metadata.index_from;
          if (wordIndex > this.metadata.vocabulary_size) {
            wordIndex = this.OOV_INDEX;
          }

          return wordIndex;
        });
       
        const paddedSequence = this.padSequences([sequence], this.metadata.max_len);
        const input = tf.tensor2d(paddedSequence, [1, this.metadata.max_len]);
     
        const predictOut = this.model.predict(input);
        const score = predictOut.dataSync()[0];
        predictOut.dispose();
     
        return {
            score: score,
            sentiment: score > this.SentimentThreshold.Positive ? "Positive" : (score > this.SentimentThreshold.Neutral ? "Neutral" : "Negative") 
        };
    }

    padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = this.PAD_INDEX) {
        return sequences.map(seq => {
          if (seq.length > maxLen) {
            if (truncating === 'pre') {
              seq.splice(0, seq.length - maxLen);
            } else {
              seq.splice(maxLen, seq.length - maxLen);
            }
          }
      
          if (seq.length < maxLen) {
            const pad = [];
            for (let i = 0; i < maxLen - seq.length; ++i) {
              pad.push(value);
            }
            if (padding === 'pre') {
              seq = pad.concat(seq);
            } else {
              seq = seq.concat(pad);
            }
          }
      
          return seq;
        });
      }
}

const getSentiment = async text => {
    if (!sa) {
        sa = new SentimentAnalysis("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json", "metadata.json");
        await sa.setup();
    }

    return sa.getSentiment(text);
}

module.exports = getSentiment;