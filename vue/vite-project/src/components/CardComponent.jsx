import productsImg from "../assets/image.jpeg"

const CardComponent = ({productName, description, price, imageUrl}) => {
    const {test} = props
    console.log(test)

    return (
        <article class="col">
            <div class="card shadow-sm">
                <img 
                    src={imageUrl|| productsImg}
                    className="card-img-top"
                    alt={title}
                    />

                    <div class="card-body">
                        <h5 className="card-title">{productName}</h5>
                        <p class="card-text">{description}</p>
                        <p class="card-text">{price}</p>
                        <p class="card-text">{imageUrl}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
        );
    };


export default CardComponent;