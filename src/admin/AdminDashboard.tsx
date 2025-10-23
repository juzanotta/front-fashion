import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

type graficoClienteType = {
  cidade: string
  num: number
}

type geralDadosType = {
  clientes: number
  produtos: number
  vendas: number
}

export default function AdminDashboard() {
  const [clientesCidade, setClientesCidade] = useState<graficoClienteType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/clientesCidade`)
      const dados = await response.json()
      setClientesCidade(dados)
    }
    getDadosGraficoCliente()

  }, [])

    const listaClientesCidade = clientesCidade.map(item => (
    { x: item.cidade, y: item.num }
  ))

  return (
    <div className="container pt-24 pl-10">
      <h2 className="font-serif text-[#C33941] text-4xl pb-10">visão geral do sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-15 font-sans font-semibold">
        <div className="border-[#C33941] border rounded p-6 w-1/3 me-3">
          <span className="bg-[#C33941] text-[#F1EEE7] text-xl text-center mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}</span>
          <p className=" text-[#C33941] mt-2 text-center">nº clientes</p>
        </div>
        <div className="border-[#E37036] border rounded p-6 w-1/3 me-3">
          <span className="bg-[#E37036] text-[#F1EEE7] text-xl text-center mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.produtos}</span>
          <p className="text-[#E37036] mt-2 text-center">nº produtos</p>
        </div>
        <div className="border-[#E35236] border rounded p-6 w-1/3">
          <span className="bg-[#E35236] text-[#F1EEE7] text-xl text-center mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.vendas}</span>
          <p className="text-[#E35236] mt-2 text-center">nº vendas</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg viewBox="30 55 400 400">
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#C33941",
              fontFamily: "Work Sans",
              fontWeight: "600"
            }}
            x={200}
            y={200}
            text={["produtos", "por marca"]}
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaClientesCidade}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Work Sans",
                fontWeight: "600"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#C33941",
              fontFamily: "Work Sans",
              fontWeight: "600"
            }}
            x={200}
            y={200}
            text={["clientes", "por cidade"]}
          />
        </svg>

      </div>
    </div>
  )
}