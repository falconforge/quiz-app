import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

// Use fileURLToPath to get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = (app) => {
  // Format the current date for the filename
  const date = format(new Date(), 'yyyy-MM-dd');
  
  // Create a log file name based on the current date
  const logFileName = path.join(__dirname, `../logs/logger-${date}.log`);

  // Ensure the log directory exists
  if (!fs.existsSync(path.dirname(logFileName))) {
    fs.mkdirSync(path.dirname(logFileName), { recursive: true });
  }

  // Setup morgan logging with rotation for requests
  const logStream = fs.createWriteStream(logFileName, { flags: 'a' });
  
  // Use morgan to log both to the file and to the console (for development)
  app.use(morgan('combined', { stream: logStream }));
  app.use(morgan('dev')); // Logs to console for development
};

export default logger;