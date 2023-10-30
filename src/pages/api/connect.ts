import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  //   message_dos: string;
  //   message_full: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log("body", req.body);
  console.log("query", req.query);
  console.log("full", req);
  res.status(200).json({
    message: JSON.stringify(req.body),
    // message_dos: JSON.stringify(req.query),
    // message_full: JSON.stringify(req),
  });
}
