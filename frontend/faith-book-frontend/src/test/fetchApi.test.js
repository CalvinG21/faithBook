async function getCountry(name) {
    const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix='+name;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4eaa05faa3mshc509b8103dd269ep1731e6jsnda75783619ba',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};


    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
}


//test country api get country code required for other api calls
test('the data is peanut butter', async () => {
  const dataz = await getCountry("Zimbabwe");
  expect(dataz.data[0].code).toBe('ZW');
});



