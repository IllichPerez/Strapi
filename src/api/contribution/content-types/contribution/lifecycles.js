module.exports = {
  afterUpdate(event) {
    const { result } = event;
    const status = result.status;
    const churchID = result.church.id;
    const concept = result.concept;
    const dispersed = result.dispersed; 

    if (churchID && status === 'confirmed' && concept === 'subscription' && dispersed === false) {
      const updateChurch = async () => {
        // Calcular la fecha de expiración (un mes después de hoy)
        const today = new Date();
        const expirationDate = new Date(today);
        
        // Agregar un mes
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        
        // Si el día resultante no existe en el nuevo mes, ajustar al último día del mes
        // Por ejemplo: 31 de enero → 28 de febrero (o 29 en año bisiesto)
        const originalDay = today.getDate();
        const newDay = expirationDate.getDate();
        
        if (originalDay !== newDay) {
          // El día no existe en el nuevo mes, ajustar al último día del mes
          expirationDate.setDate(0); // Esto establece la fecha al último día del mes anterior
        }
        
        const data = {
          subscription_active: true,
          subscription_expiration: expirationDate.toISOString().split('T')[0] // Formato YYYY-MM-DD
        }
        try {
          const response = await fetch(`${process.env.URL}/api/churches/${churchID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
            },
            body: JSON.stringify({data})
          })
          const responseJson = await response.json()
          console.log(responseJson)
        } catch (error) {
          console.error('Error creating post:', error)
        }
      }
      updateChurch()
    }

  }
}