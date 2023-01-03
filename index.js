const { ContainerClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "<account name>";
  const accountKey = process.env.ACCOUNT_KEY || "<account key>";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

  // Create a unique name for the container
  const containerName = 'retohub';

  console.log('\nCreating container...');
  console.log('\t', containerName);

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  // Create the container
  
  const createContainerResponse = await containerClient.create();
  console.log(
    `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
  );

  // Create a unique name for the blob
  const blobName = 'quickstart' + uuidv1() + '.png';

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Display blob name and url
  console.log(
    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
  );

  // Upload data to the blob
 // const data = 'Hello, Vekin!';
 // const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
 // console.log(
 //   `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
 // );
  
  var filePath = './test.png';
  blockBlobClient.uploadFile(filePath);

  // Delete container
  //await containerClient.delete();

  //console.log("deleted container");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
