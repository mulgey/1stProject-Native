function hedefÖğesiSilme(id) {
  kursHedefleriAksiyonu((mevcutHedeflerBütünü) => {
    return mevcutHedeflerBütünü.filter((tekilHedef) => tekilHedef.id !== id);
  });
}
