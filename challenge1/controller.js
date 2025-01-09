import crypto from 'crypto';
import { treasureMap, reverseMap } from '../app.js';


const generatePortalID = () => {
  return crypto.randomBytes(4).toString('hex');
}



export const shortenUrl = async (req, res) => {

    try {
        const { longUrl } = req.body;
      
        if (!longUrl) {
          return res.status(400).json({ error: 'Long URL is required' });
        }
      
        // To prevent duplicate entries
        if (reverseMap[longUrl]) {
          return res.json({ message: "The long URL already exists",shortUrl: `${req.protocol}://${req.get('host')}/${reverseMap[longUrl]}` });
        }
      
        let portalID;
        // This loop will run until a unique portal ID is generated
        do {
          portalID = generatePortalID();
        } while (treasureMap[portalID]);
      
        // Store the mappings
        treasureMap[portalID] = longUrl;
        reverseMap[longUrl] = portalID;

        console.log(treasureMap);
        res.status(200).json({  message: "The Url was shortened successfully", shortUrl: portalID });
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
        
    }
  };


export const getOriginalUrl = async (req, res) => {
    try {
        const { portalID } = req.params;
      
        const longUrl = treasureMap[portalID];
      
        if (!longUrl) {
          return res.status(404).json({ error: 'Portal ID not found' });
        }
      
        console.log(reverseMap);
        return res.status(200).json({ longUrl });
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  };