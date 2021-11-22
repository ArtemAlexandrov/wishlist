// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://api-eu-central-1.graphcms.com/v2/ckwax1zmh2wb401z2gz0pfxhh/master
// web
// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2Mzc2MTE0MTQsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2Nrd2F4MXptaDJ3YjQwMXoyZ3owcGZ4aGgvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzU1ZmUzNzAtMDMzMy00ZTFjLThlMWEtNmVmMDllYzU5NmJlIiwianRpIjoiY2t3YjNqeTZrMzM5ODAxeHA4bmgyMjZpNCJ9.yOA_2FYquH1ux__jdGkRCEaLC9EBvFO9JA_zRUMZtUzUypa8D03PNZABR17PXb8ZLeyixG2hC06-eHqxqjtxsDxONL2LzYmBpY2CQSEzi34lGrNquYXsDeyVIMUMHjMXLfcH1xiCLD9BkgMKPAweWQM1y0fDahHU3EtXuTHoVHjfOPQ7e7lTVhSYGvPfRlgULZ2tLJIgbquqtD_lFYssPWWyWWWzfvQ_Ws4qeFzKkEgawJzzWZff8kezfFaLalBo9_7Gmwhih46uJ6csewnJuvkyOaRw70Csh5S1rUzhxp127GXqCVrqsX-FvkuRXvZZtRXtdSmDZjossjDJrmb1APngP_MimMH9NThTsH32MiLz2VwVmOnoPVoTC5jvcuRvr1_NtU4vR8dja9a759Dih2hsSJjUO-qdfWkDRRN47tKczubUS7uokMPWhdxDEMd9Ph_4ZJSLgg10gn0tR3JtWBmQMrRZN0FLlSPmEU5IbtdHuYWudJNGXf75cq7bIiiVX7Hchjn8rUoTxo63sCXHEYLHhm3VsUEnnHtmnU3xU0kkgQQuoe-CNGIKp0_LxADiB0ZVhDAonkx6Pe1hx8Iw4nKN-_UvzgNR0ZwfzGXfZOOkSvxRUt-O-wyla6ugNwha_R8BcRPH1uYDowfyT_Ay4cOps-rTSlCz3VM3VhQGF3U


export default async function handler(req, res) {
  const response = await fetch("https://api-eu-central-1.graphcms.com/v2/ckwax1zmh2wb401z2gz0pfxhh/master", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query:`{
  wishItems {
    id
    itemName
    description
    url
    image {
      url
    }
  } 
}`
  })});
  const data = await response.json()
  res.status(200).json(data)
}
