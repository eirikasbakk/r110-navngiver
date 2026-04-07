import { useState } from "react";
import "./App.css";
import { NAME_OPTIONS } from "./r110Names";

type DocType = "gd" | "rg" | "m" | "r";

function prettyLabel(value: string) {
  // Gjør "basis-geodata" -> "Basis geodata"
  return value
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function App() {
  const [docType, setDocType] = useState<DocType>("m");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [runningNumber, setRunningNumber] = useState("");
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState("");
  const [contract, setContract] = useState("");
  const [copied, setCopied] = useState(false);

  // ✅ LEDD 3 (Navn) er kun aktuelt for:
  // - Modeller: m + (g|f)
  // - Resultatdata: r + (p|ds|d)
  // ✅ Ikke aktuelt for gd og rg (da utgår ledd 3)
  const nameKey =
    docType === "m" && (category === "g" || category === "f")
      ? `m_${category}`
      : docType === "r"
      ? `r_${category}`
      : null;

  const nameOptions = nameKey ? NAME_OPTIONS[nameKey] ?? [] : [];

  // ✅ Output – korrekt R110-struktur
  const output = [
    docType,
    category,
    nameKey ? name : null,
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

              setCategory("");
              setName("");
              setRunningNumber("");
              setDescription("");
              setPhase("");
              setContract("");
            }}
          >
            <option value="gd">gd – Grunnlagsdata</option>
            <option value="m">m – Modeller</option>
            <option value="r">r – Resultatdata</option>
            <option value="rg">rg – Registrerte data</option>
          </select>
        </div>

        {/* LEDD 2 */}
        <div className="row">
          <label>Ledd 2 – Kategori</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setName("");
            }}
          >
            <option value="">– velg –</option>

            {/* gd – Grunnlagsdata (tema fra Geonorge) */}
            {docType === "gd" &&
              (NAME_OPTIONS.gd ?? []).map((t) => (
                <option key={t} value={t}>
                  {prettyLabel(t)}
                </option>
              ))}

            {/* m – Modeller */}
            {docType === "m" && (
              <>
                <option value="g">g – Grunnlagsmodell</option>
                <option value="f">f – Fagmodell</option>
                <option value="s">s – Situasjonsmodell</option>
                <option value="t">t – Tverrfaglig modell</option>
                <option value="sa">sa – Samordningsmodell</option>
              </>
            )}

            {/* r – Resultatdata */}
            {docType === "r" && (
              <>
                <option value="p">p – Presentasjon</option>
                <option value="ds">ds – Datasett</option>
                <option value="d">d – Dokument</option>
              </>
            )}

            {/* rg – Registrerte data (brukes som LEDD 2) */}
            {docType === "rg" &&
              (NAME_OPTIONS.rg ?? []).map((rg) => (
                <option key={rg} value={rg}>
                  {rg}
                </option>
              ))}
          </select>
        </div>

        {/* ✅ LEDD 3 – kun når nameKey finnes (m_g, m_f, r_*) */}
        {nameKey && (
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
        )}

        <div className="row">
          <label>Ledd 4 (valgfri) – Løpenummer</label>
          <input
            placeholder="001"
            value={runningNumber}
            onChange={(e) => setRunningNumber(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Ledd 5 (valgfri) – Beskrivelse</label>
          <input
            placeholder="Alt-01"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Ledd 6 (valgfri) – Prosjektfase</label>
          <input
            placeholder="123456k-01"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Ledd 7 (valgfri) – Entreprise</label>
          <input
            placeholder="E01"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
          />
        </div>
      </div>

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