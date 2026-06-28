import DiagramNode from "./DiagramNode";
import Connection from "./Connection";

export default function ArchitectureDiagram() {

    return (

<div className="mt-20">

{/* Top */}

<div className="flex justify-center">

<DiagramNode
title="React + Vite"
subtitle="Streaming Chat Interface"
color="blue"
/>

</div>

<Connection />

<div className="flex justify-center">

<DiagramNode
title="Flask API"
subtitle="Server-Sent Events"
color="green"
/>

</div>

<Connection />

{/* Branch */}

<div className="grid grid-cols-2 gap-16 items-start mt-8">

<div className="flex flex-col items-center">

<DiagramNode
title="Retrieval"
subtitle="Sentence Transformers"
color="purple"
/>

</div>

<div className="flex flex-col items-center">

<DiagramNode
title="Citation Builder"
subtitle="Evidence Generation"
color="orange"
/>

</div>

</div>

<Connection />

<div className="flex justify-center">

<DiagramNode
title="Prompt Builder"
subtitle="Context Assembly"
color="orange"
/>

</div>

<Connection />

<div className="flex justify-center">

<DiagramNode
title="Phi-4-mini"
subtitle="Local LLM"
color="red"
/>

</div>

<Connection />

<div className="flex justify-center">

<DiagramNode
title="Streaming"
subtitle="Server-Sent Events"
color="green"
/>

</div>

<Connection />

<div className="flex justify-center">

<DiagramNode
title="React Markdown"
subtitle="Streaming Renderer"
color="blue"
/>

</div>

</div>

);

}