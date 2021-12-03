import axios from 'axios'
const END_URL = "http://localhost:8080/products" ;
 
class ProductService{

    getProduct(){
        return axios.get(END_URL);
    }
}
export default new ProductService();