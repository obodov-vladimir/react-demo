const ProductCategoryRow = props => (
	<tr><th colSpan="2">{props.category}</th></tr>
);
const ProductRow = props => {	
		let name = props.product.stocked ?
    	props.product.name :
      <span style={{color: 'red'}}>
        {props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{props.product.price}</td>
      </tr>
    );
	
};
const ProductTable = ({products, ...props}) =>{
	let rows=[];
	let lastCategory;
	let self=this;
	products.forEach(function(product){
		
		if(!(~product.name.toLowerCase().indexOf(props.filterText.toLowerCase()))
		   ||(!product.stocked&&props.inStockOnly)) return;
		
		if(product.category != lastCategory){
		 		rows.push(<ProductCategoryRow product={product} key={product.category} />);
		}
		rows.push(<ProductRow product = {product} key = {product.name} />);
		lastCategory = product.category;
	});
	return(
		<table>
       <thead>
         <tr>
           <th>Name</th>
           <th>Price</th>
         </tr>
       </thead>
       <tbody>{rows}</tbody>
     </table> 
	);
};
class SearchBar extends React.Component{
	handleChange(){
		this.props.onUserInput(
		  this.refs.filterTextInput.value,
		  this.refs.inStockOnlyInput.checked
		);
	},
	render(){
		return(
		  <form>
		  	<input 
		  		type='text'
		  		ref='filterTextInput' 
		  		placeholder='Search...' 
		  		value={this.props.filterText} 
		  		onChange={this.handleChange}
		  	/>
		  	<label>
		  		<input 
		  			ref='inStockOnlyInput' 
		  			type='checkbox' 
		  			checked={this.props.inStockOnly} 
		  			onChange={this.handleChange} 
		  		/> 
		  		Only show products in stock 
		  	</label>
		  </form>
		);
	}
};
class FilterableProductTable extends React.Component{
	getInitialState(){
		return{
			filterText: '',
			inStockOnly: false
		}
	},
	handleUserInput(filterText,inStockOnly){
		this.setState({
			filterText :filterText,
			inStockOnly: inStockOnly
		});
	},
  render() {
    return (
        <div>
  			 	<SearchBar
  			 		filterText={this.state.filterText}
  			 		inStockOnly={this.state.inStockOnly}
  			 		onUserInput={this.handleUserInput}
  			 	/> 
        	<ProductTable 
        		filterText={this.state.filterText}
  			 		inStockOnly={this.state.inStockOnly}
  			 		products={this.props.products} 
  			 	/>
        </div>
    );
  }
};
var PRODUCTS = [{
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football'
}, {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball'
}, {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball'
}, {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch'
}, {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5'
}, {
    category: 'Electronics',
    price: '$199.99',
    stocked: true,
    name: 'Nexus 7'
}];
ReactDOM.render( <FilterableProductTable products ={PRODUCTS}/> , document.getElementById('content'));