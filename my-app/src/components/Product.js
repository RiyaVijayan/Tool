import React from 'react'
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css' 
import ProductService from '../services/ProductService'
import 'react-responsive-modal/styles.css'
import {Modal} from 'react-responsive-modal'

class Product extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            products : [],
            showModal : false,
            show :false ,
            productid : 0,
            id : 0,
            name : "",
            price : 0,
            description : "",
            searchName : []
            
        }
        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleUpdateData = this.handleUpdateData.bind(this);
        this.openCreateModal= this.openCreateModal.bind(this);
        this.openUpdateModal= this.openUpdateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
    }
    componentDidMount(){
        ProductService.getProduct().then((resp) => {
            this.setState({products : resp.data})
        }).catch((er)=>{
            console.log(er)
        })
    }
    handleId = (e)=> {
        this.setState({id : e.target.value})
    }
    handleName =(e)=> {
        this.setState({name : e.target.value})
    }
    handlePrice = (e)=> {
        this.setState({price : e.target.value})
    }
    handleDesc = (e)=>{
        this.setState({description : e.target.value})
    }
    handleCreateData = (e) => {
        e.preventDefault();
        const create = {
            id : this.state.id,
            name : this.state.name,
            price : this.state.price,
            description : this.state.description
        }
        axios.post('http://localhost:8080/products',{
            id : this.state.id,
            name : this.state.name,
            price : this.state.price,
            description : this.state.description
        }).catch((er)=> {
            console.log(er);
        });
        let createPdt = []
        createPdt = this.state.products
        createPdt.push(create);
        this.setState({products : createPdt})
        this.setState({showModal: false})
    }
    handleUpdateData= (e) => {
        e.preventDefault()
        const updatePdt = {
            id : this.state.productid,
            name : this.state.name,
            price : this.state.price,
            description : this.state.description 
        }
        axios.put(`http://localhost:8080/products/${this.state.productid}`,{
            id : this.state.productid,
            name : this.state.name,
            price : this.state.price,
            description : this.state.description 
        }).catch((er)=> {
            console.log(er);
        });
        let updateProduct = [];
        updateProduct = this.state.products
        let num = updateProduct.findIndex((product) => product.id === parseInt(this.state.productid))
        updateProduct.splice(num,1);
        updateProduct.push(updatePdt)
        this.setState({products : updateProduct})
        this.setState({showModal: false})
        
        
    }
    handleSearch = () => {
        //e.preventDefault()
        //this.setState({searchName: e.target.value})
            let search = [];
            search = this.state.products
            let num = search.findIndex((product)=> product.name === (this.state.searchName));
            let data = search.slice(num,num+1)
            this.setState({products : data})
       
    }
    deleteProduct = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8080/products/${e.target.value}`)
        .catch((er)=> {
            console.log(er);
        });
        let deleteProducts = this.state.products.filter((product) => product.id !== parseInt(e.target.value ));
        this.setState({products : deleteProducts})
    }
    openUpdateModal = (e) => {
        let id = (e.target.value)
        this.setState(
            { showModal: true,
            productid : id });
    };
    openCreateModal = (e) => {
        this.setState({ show: true });
    };
    closeUpdateModal = () => {
        this.setState(
            { showModal: false });
    };
    closeCreateModal = () => {
        this.setState(
            { show: false });
    };

    render(){
        const {showModal} = this.state;
        const {show} =this.state;
        return(
            <div className = "container">
            <h1 className = "text-center" > Product APP </h1>
            <div className="text-right">
                <input className="form-control-sm mb-4 mr-sm-2" maxLength="36" type="text" placeholder="Search Product By Name" onChange={e => {this.setState({searchName: e.target.value})}} onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.handleSearch()
                }
              }}
 />
                <button type="button" className= "btn btn-primary btn-sm mr-1" id="show" onClick={this.openCreateModal}> Add Product </button>
            </div>
            <br></br>
            <div className = "row">
            <table className="table table-borderless table-striped border-top border-bottom border-dark">
                <thead className = "table-active border-bottom border-dark">
                    <tr>
                        <th scope="col"> Product ID </th>
                        <th scope="col"> Product Name </th>
                        <th scope ="col"> Product Price  </th>
                        <th scope ="col"> Product Description  </th>
                        <th scope="col"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.products.map(
                            product =>
                            <tr key = {product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <Modal open={showModal} onClose={this.closeUpdateModal} center>
                                    <div>
                                        <h5 className="modal-title">Edit Product Info</h5>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <label>Product ID</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.productid} placeholder={this.state.productid} readOnly></input>
                                            <label>Product Name</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.name} onChange={this.handleName} placeholder="Enter Product Name"></input>
                                            <label>Product Price</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.price} onChange={this.handlePrice} placeholder="Enter Product Price"></input>
                                            <label>Product Description</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.description} onChange={this.handleDesc} placeholder="Enter Product Description"></input>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.handleUpdateData}>Save changes</button>
                                    </div>
                                </Modal>
                                <Modal open={show} onClose={this.closeCreateModal} center>
                                    <div>
                                        <h5 className="modal-title">Edit Product Info</h5>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <label>Product ID</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.id} onChange={this.handleId} placeholder="Enter Product Id" ></input>
                                            <label>Product Name</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.name} onChange={this.handleName} placeholder="Enter Product Name"></input>
                                            <label>Product Price</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.price} onChange={this.handlePrice} placeholder="Enter Product Price"></input>
                                            <label>Product Description</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" value={this.state.description} onChange={this.handleDesc} placeholder="Enter Product Description"></input>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.handleCreateData}>Save changes</button>
                                    </div>
                                </Modal>
                                <td>
                                    <button type="button" className= "btn btn-primary btn-sm mr-1" id="showModal" value={product.id} onClick={this.openUpdateModal}> Edit </button>
                                    <button type="button" className= "btn btn-primary btn-sm" value={product.id} onClick={this.deleteProduct}> Delete </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
        )
    }
    
        


}
export default Product;