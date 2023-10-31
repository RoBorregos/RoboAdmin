import type { NextApiRequest, NextApiResponse } from "next";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

type ResponseData = {
  message: string;
  //   message_dos: string;
  //   message_full: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log("body", req.body);
  console.log("query", req.query);
  //   console.log("full", req);
  console.log("full", req.headers.connectionId);
  const id = req.headers.connectionId as string;
  if (!id) {
    res.status(400).json({
      message: "No message provided",
    });
  }
  const apiGatewayClient = new ApiGatewayManagementApiClient({
    // apiVersion: "2018-11-29",
    endpoint: "https://0dgey6d1uf.execute-api.us-east-1.amazonaws.com/develop",
  });
  const postToConnectionCommand = new PostToConnectionCommand({
    ConnectionId: id,
    Data: JSON.stringify({
      action: "message",
      content: id,
    }),
  });

  const result = await apiGatewayClient.send(postToConnectionCommand);
  res.status(200).json({
    message: JSON.stringify(req.body),
    // message_dos: JSON.stringify(req.query),
    // message_full: JSON.stringify(req),
  });
}
