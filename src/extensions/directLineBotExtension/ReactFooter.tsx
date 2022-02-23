
import * as React from "react";
import { Link } from 'office-ui-fabric-react/lib/Link';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { DirectLine } from "botframework-directlinejs";
import ReactWebChat from "botframework-webchat";

export interface IReactFooterProps {
    directLineToken: string;
    upn: string;
 }

export default class ReactFooter extends React.Component<IReactFooterProps> {
    private directLine: DirectLine;
    constructor(props: IReactFooterProps) {
        super(props);

        this.directLine = new DirectLine({ token: props.directLineToken });

        this.directLine.postActivity({
            type: 'event',
            value: {
                scope: "Directline Webpart",
                uri: "//contoso.directline.webpart",
                type: "scope initialization",
            },
            from: {id:this.props.upn},
            name: 'SetBotScope',
        }).subscribe(obs => {
            console.log("Welcome Message Initialized");
        });
    }

    public render() : JSX.Element{
        return (
            <ReactWebChat directLine={this.directLine} userID={this.props.upn}/>
        );
    }
}
