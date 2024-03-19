export const fetchData = async () => {
    try {
      const response = await fetch('', {
        method: "GET",
        headers: {},
        referrer: ''
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
  
      if (data && data.payload) {
        const datatoDis= data.payload.map(({ id, label }) => ({ id, label }));
         console.log(datatoDis);
        return datatoDis;
       
      } else {
        throw new Error('Data payload is missing');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  