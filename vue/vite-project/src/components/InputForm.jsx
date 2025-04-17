const InputForm = ({type, id, ariaDescribe}) => {
    return (
        <input
            type = {type}
            className="form-control"
            id = {id}
            aria-describedby = {ariaDescribe}
        />
    )
}

export default InputForm