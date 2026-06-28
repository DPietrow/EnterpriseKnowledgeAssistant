const colors = {

    blue:
        "from-blue-600/30 to-blue-500/10 border-blue-500/40",

    green:
        "from-emerald-600/30 to-emerald-500/10 border-emerald-500/40",

    purple:
        "from-violet-600/30 to-violet-500/10 border-violet-500/40",

    orange:
        "from-orange-600/30 to-orange-500/10 border-orange-500/40",

    red:
        "from-rose-600/30 to-rose-500/10 border-rose-500/40"

};

export default function DiagramNode({

    title,

    subtitle,

    color="blue"

}) {

    return (

        <div
            className={`
            group
            relative
            overflow-hidden
            
            w-full
            max-w-md
            
            rounded-2xl
            
            border
            
            bg-gradient-to-br
            
            ${colors[color]}
            
            backdrop-blur
            
            p-8
            
            transition-all
            
            duration-300
            
            hover:-translate-y-2
            
            hover:scale-[1.03]
            
            hover:shadow-[0_0_40px_rgba(59,130,246,.15)]
            `}
            >
            
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">

            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"/>

            </div>
            <div className="text-2xl font-bold">

                {title}

            </div>

            <div className="mt-3 text-slate-300">

                {subtitle}

            </div>

        </div>

    );

}