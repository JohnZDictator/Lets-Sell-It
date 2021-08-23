import { useState } from 'react';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [numOfProduct, setNumOfProduct] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('You have submitted;');
    }

    return (
        <>
            <article>
                <form action="" className="form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="numOfProduct">Number Of Products in Stock</label>
                        <input type="text" id="numOfProduct" name="numOfProduct" value={numOfProduct} onChange={(e) => { setNumOfProduct(e.target.value) }} />
                    </div>
                    <button type="submit">Create Product</button>
                </form>
            </article>
        </>
    );
};

export default CreateProduct;