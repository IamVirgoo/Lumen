interface ServiceProps {
    serviceTitle? : string;
    serviceDescription?: string
}

export default function Card(props : ServiceProps) {
    return <div className={"card"}>
        <div className={"card--content"}>
            <div className={"card--content--img"}/>
            <div className={"card--content--text-wrapper"}>
                <p className={"card--content--text-wrapper--title"}>
                    {props.serviceTitle || "Title"}
                </p>
                <div className={"card--content--text-wrapper--line"}/>
            </div>
            <p className={"card--content--description"}>
                {props.serviceDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
            </p>
        </div>
    </div>
}