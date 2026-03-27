import { useState } from "react";
import "./App.css";
import { NAME_OPTIONS } from "./r110Names";

type DocType = "rg" | "m" | "r";
type Category = string;

export default function App() {
  const [docType, setDocType] = useState<DocType>("m");
  const [category, setCategory] = useState<Category>("f");
  const [name, setName] = useState("");
  const [runningNumber, setRunningNumber] = useState("");
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState("");
  const [contract, setContract] = useState("");
  const [copied, setCopied] = useState(false);

  const nameKey =
    docType === "m"
      ? `m_${category}`
      : docType === "r"
      ? `r_${category}`
      : "rg";

  const nameOptions = NAME_OPTIONS[nameKey] ?? [];

  const output = [
    docType,
    category,
    name,
    runningNumber,
    description,
    phase,
    contract,
  ]
    .filter(Boolean)
    .join("_");

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="page">
      <h1>R110 navngiver</h1>

      <div className="card">
        <h2>Input</h2>

        {/* LEDD 1 */}
        <div className="row">
          <label>Ledd 1 – Dokumentasjonstype</label>
          <select
            value={docType}
            onChange={(e) => {
              const v = e.target.value as DocType;
              setDocType(v);

              // sett gyldig startkategori
              if (v === "m") setCategory("f");
              if (v === "r") setCategory("p");
              if (v === "rg") setCategory("");

              // 🔴 nullstill ALT som avhenger av ledd 1
              setName("");
              setRunningNumber("");
              setDescription("");
              setPhase("");
              setContract("");
            }}
          >
            <option value="rg">rg – Registrerte data</option>
            <option value="m">m – Modeller</option>
            <option value="r">r – Resultatdata</option>
          </select>
        </div>

        {/* LEDD 2 */}
        <div className="row">
          <label>Ledd 2 – Kategori</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);

              // 🔴 navn er ikke lenger gyldig
              setName("");
            }}
          >
            {docType === "m" && (
              <>
                <option value="g">g – Grunnlagsmodell</option>
                <option value="f">f – Fagmodell</option>
              </>
            )}
            {docType === "r" && (
              <>
                <option value="p">p – Presentasjon</option>
                <option value="ds">ds – Datasett</option>
                <option value="d">d – Dokument</option>
              </>
            )}
          </select>
        </div>

        {/* LEDD 3 */}
        <div className="row">
          <label>Ledd 3 – Navn</label>
          <select
            value={name}
            disabled={nameOptions.length === 0}
            onChange={(e) => setName(e.target.value)}
          >
            <option value="">– velg –</option>
            {nameOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* LEDD 4 */}
        <div className="row">
          <label>Ledd 4 (valgfri) – Løpenummer</label>
          <input
            placeholder="001"
            value={runningNumber}
            onChange={(e) => setRunningNumber(e.target.value)}
          />
        </div>

        {/* LEDD 5 */}
        <div className="row">
          <label>Ledd 5 (valgfri) – Beskrivelse</label>
          <input
            placeholder="Alt-01"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* LEDD 6 */}
        <div className="row">
          <label>Ledd 6 (valgfri) – Prosjektfase</label>
          <input
            placeholder="123456k-01"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          />
        </div>

        {/* LEDD 7 */}
        <div className="row">
          <label>Ledd 7 (valgfri) – Entreprise</label>
          <input
            placeholder="E01"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
          />
        </div>
      </div>

      {/* RESULTAT */}
      <div className="card">
        <h2>Resultat</h2>

        <div className="output">
          <code>{output || "—"}</code>
        </div>

        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          disabled={!output}
        >
          {copied ? "Kopiert!" : "Kopier"}
        </button>
      </div>
    </div>
  );
}
