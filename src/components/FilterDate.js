import React from 'react';

export default function DateFilter(props) {

    // This code should be integrated into the call for elements on the main page
    let [cardList, setCardList] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
      
    useEffect(() => {
        axios
        //   .get(`backend')
    //       .then(response => {
    //         let results = response.data.filter(card => {
    //           return card.title.toLowerCase().includes(searchQuery.toLowerCase())
    //         });
    //         setCardList(results);
    //       })
    //       .catch(error => console.log('Call not complete', error))
      }, [searchQuery]);

    
  return (
    <div></div>
  );
}