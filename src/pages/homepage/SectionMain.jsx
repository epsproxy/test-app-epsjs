import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext';
import { NETWORK_TYPE } from '../../config'
import { WassiePawnHelper, LoomLockNFTHelper, useEps } from '@epsproxy/epsjs';
// import { WassiePawnHelper, LoomLockNFTHelper, useEps } from '../../../../web3lib';

function SectionMain() {
    const { invalidNetwork, user } = useApp();
    return (
        <>
            <section className="section-proxy">
                {invalidNetwork ? (
                    <p className="no-wallet-info">Please switch to <strong>{NETWORK_TYPE}</strong> network to use this application</p>
                ) : (
                    user ? (
                        <TestMain user={user} />
                    ) : (
                        <p className="no-wallet-info">Connect wallet to see your proxy details</p>
                    )
                )}
            </section>
        </>
    )

}

function TestMain({ user }) {
    const [wassieHelper, setWassieHelper] = useState()
    const [loomlockNFTHelper, setLoomlockNFTHelper] = useState()
    const { helper } = useEps()

    useEffect(() => {
        init()
    }, [])

    const init = async() => {
        const wassieHelper = await WassiePawnHelper.init(Web3.givenProvider)
        const loomlockNFTHelper = await LoomLockNFTHelper.init(Web3.givenProvider)
        setWassieHelper(wassieHelper)
        setLoomlockNFTHelper(loomlockNFTHelper)
    }

    const handleGetLoans = async() => {
        const loans = await wassieHelper.getLoans(input)
        console.log({loans})
    }

    const handleGetSigils = async() => {
        const addressSigils = await loomlockNFTHelper.addressSigils(input)
        console.log({addressSigils})
    }

    const handleGetAddresses = async() => {
        const addresses = await helper.getAddresses(input)
        console.log({ addresses})
    }

    const [input, setInput] = useState("")

    return (
        <>
        <div className="button-test-container">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div className="button-test-container">
            <button onClick={handleGetLoans} className="button button-success">Get Loans</button>
            <button onClick={handleGetSigils} className="button">Get Sigils</button>
            <button onClick={handleGetAddresses} className="button">Get Addresses</button>
        </div>
        </>
    )
}

export default SectionMain
