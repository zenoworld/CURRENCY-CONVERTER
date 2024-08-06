import { useState } from 'react'
import './App.css'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
function App() {
    const [amount, setAmount] = useState(0)
    const [fromCurrency, setFromCurrency] = useState("usd")
    const [toCurrency, setToCurrency] = useState("inr")
    const [convertamount, setConvertAmount] = useState(0)

    const currencyInfo = useCurrencyInfo(fromCurrency)

    const options = Object.keys(currencyInfo)

    const swap = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
        setConvertAmount(amount)
        setAmount(convertamount)
    }

    const result = () => {
        setConvertAmount(amount * currencyInfo[toCurrency])
    }


    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/033/692/798/non_2x/hundred-dollar-bills-on-wooden-floor-3d-render-illustration-money-and-dollar-bills-are-spread-out-on-the-table-ai-generated-free-photo.jpg')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-black/10">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            result()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From" 
                                amount={amount}
                                currencyOptions={options}
                                selectCurrency={fromCurrency}
                                onCurrencyChange={(currency) => setFromCurrency(currency)}
                                onAmountChange={(amount) => setAmount(amount)}


                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertamount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setToCurrency(currency)}
                                selectCurrency={toCurrency}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
