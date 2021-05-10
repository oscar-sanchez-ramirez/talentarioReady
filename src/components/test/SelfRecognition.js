import React from 'react'



export const SelfRecognition = () => {

    // const option7 = [7, 7, 7, 7, 7];
    // const option6 = [6, 6, 6, 6];
    // const option5 = [5, 5, 5];
    // const option4 = [4, 4, 4];
    // const option3 = [3, 3, 3, 3];
    // const option2 = [2, 2, 2];
    // const option1 = [1, 1, 1];

    const handleInputchange = (e) => {
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.option7.value)
    }
 


    return (
        <div>
            <h5>Auto Reconocimiento</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor="option7">7</label>
                <input type="radio" name="option" id="option7" value="7" style={{ marginRight: '20px'}} onChange={handleInputchange}/>

                <label htmlFor="option6">6</label>
                <input type="radio" name="option" id="option6" value="6" style={{ marginRight: '20px'}} onChange={handleInputchange}/>


                <label htmlFor="option5">5</label>
                <input type="radio" name="option" id="option5" value="5" style={{ marginRight: '20px'}} onChange={handleInputchange}/>


                <label htmlFor="option4">4</label>
                <input type="radio" name="option" id="option4" value="4" style={{ marginRight: '20px'}} onChange={handleInputchange}/>


                <label htmlFor="option3">3</label>
                <input type="radio" name="option" id="option3" value="3" style={{ marginRight: '20px'}} onChange={handleInputchange}/>


                <label htmlFor="option2">2</label>
                <input type="radio" name="option" id="option2" value="2" style={{ marginRight: '20px'}} onChange={handleInputchange}/>


                <label htmlFor="option1">1</label>
                <input type="radio" name="option" id="option1" value="1" style={{ marginRight: '20px'}} onChange={handleInputchange}/>

                <button>Guardar</button>

            </form>
        </div>
    )
}
