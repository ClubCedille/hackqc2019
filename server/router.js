export default app => {
  // Exemple: Router global pour la route /example.
  app.use('/example', require('./routes/example').default);
  app.use('/api/directions', require('./routes/directions').default);
  // Définir les routers ici.
};
