// import { useState } from 'react'

// export default function SearchProduct() {

//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);

//     const handleSearch = async () => {
//         try {
//             const res = await fetch(`/api/product/search?query=${query}`);
//             const data = await res.json();
//             setResults(data);
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     console.log(results);

// return (
//     <div className='min-h-screen'>
//             {/* <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search products by name or category"
//             />
//             <button onClick={handleSearch}>Search</button>
//             <ul>
//                 {results.map((product) => (
//                     <li key={product._id}>
//                         <h3>{product.name}</h3>
//                         <p>{product.description}</p>
//                         <p>Category: {product.categoryId.name}</p>
//                     </li>
//                 ))}
//             </ul> */}
//         </div>
//   )
// }
