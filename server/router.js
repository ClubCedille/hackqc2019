export default app => {
  // Exemple: Router global pour la route /example.
  app.use('/example', require('./routes/example').default);

  // Définir les routers ici.
  app.use('/coordgps', require('./routes/coordgps').default);
};
