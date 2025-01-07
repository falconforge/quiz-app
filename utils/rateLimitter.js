import rateLimit from 'express-rate-limit';

const rateLimitter = (app) => {
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    message: 'Too many requests from same IP address, please try after some time.',
  });

  app.use(limiter);
};

export default rateLimitter;