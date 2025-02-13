import React, { useState, useEffect } from "react";
import getBlockchain from "./blockchain";

function App() {
    const [contract, setContract] = useState(null);
    const [identity, setIdentity] = useState({});
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [hash, setHash] = useState("");

    useEffect(() => {
        async function loadBlockchain() {
            const { identityContract } = await getBlockchain();
            setContract(identityContract);
        }
        loadBlockchain();
    }, []);

    const createIdentity = async () => {
        if (!contract) return alert("Blockchain not connected!");
        const tx = await contract.createIdentity(name, dob, hash);
        await tx.wait();
        alert("Identity Created Successfully!");
    };

    const getIdentity = async () => {
        if (!contract) return alert("Blockchain not connected!");
        const id = await contract.getIdentity(await contract.signer.getAddress());
        setIdentity({
            name: id[0],
            dob: id[1],
            documentHash: id[2],
            verified: id[3] ? "✅ Verified" : "❌ Not Verified",
        });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Blockchain Digital Identity</h2>
            <div>
                <h3>Create Identity</h3>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="DOB" onChange={(e) => setDob(e.target.value)} />
                <input type="text" placeholder="IPFS Hash" onChange={(e) => setHash(e.target.value)} />
                <button onClick={createIdentity}>Submit</button>
            </div>

            <div>
                <h3>Check Identity</h3>
                <button onClick={getIdentity}>Fetch Identity</button>
                <p><strong>Name:</strong> {identity.name}</p>
                <p><strong>DOB:</strong> {identity.dob}</p>
                <p><strong>Document Hash:</strong> {identity.documentHash}</p>
                <p><strong>Status:</strong> {identity.verified}</p>
            </div>
        </div>
    );
}

export default App;
