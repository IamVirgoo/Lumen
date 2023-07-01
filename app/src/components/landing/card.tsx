interface ServiceProps {
    title? : string;
    description?: string
}

export default function Card(props : ServiceProps) {
    return <div className={"card"}>
        <div className={"card--content"}>
            <div className={"card--content--img"}/>
            <div className={"card--content--text-wrapper"}>
                <p className={"card--content--text-wrapper--title"}>
                    {props.title || "Title"}
                </p>
                <div className={"card--content--text-wrapper--line"}/>
            </div>
            <p className={"card--content--description"}>
                {props.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
            </p>
        </div>
    </div>
}