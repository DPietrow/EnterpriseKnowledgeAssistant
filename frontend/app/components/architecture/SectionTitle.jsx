export default function SectionTitle({

    eyebrow,

    title,

    subtitle

}) {

    return (

        <div className="max-w-3xl">

            <div className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400">

                {eyebrow}

            </div>

            <h2 className="mt-4 text-5xl font-bold">

                {title}

            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">

                {subtitle}

            </p>

        </div>

    );

}