import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/scrape-data';
import { Package } from '../models/packages';

export const add_package = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const user = request.user;
    const PackageData = await Package.create({
      metaData: { ...request.data },
      addedByUserId: user?._id,
      type: 'packages',
    });
    console.log('PackageData: ', PackageData);
    if (PackageData) {
      response.json(PackageData);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
export const getAllPackages = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const page = parseInt(request.query?.page as string) || 1; // Get the requested page number from query parameter
    const perPage = 7; // Number of packages per page

    const skip = (page - 1) * perPage; // Calculate how many packages to skip

    const allPackages = await Package.find({}).skip(skip).limit(perPage); // Query with skip and limit
    const packageLength = (await Package.find({})).length;

    return response.status(200).json({ allPackages, length: packageLength });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: 'Server error' });
  }
};

export const getPackage = async (
  request: CustomRequest,
  response: Response
) => {
  console.log('Params: ', request.params);
  try {
    const { language, name } = request.params;
    const findPackage = await Package.findOne({ 'metaData.packageName': name });

    if (findPackage) {
      return response.status(200).json(findPackage);
    }

    response.status(404).json({ error: 'Package not found. Try importing it' });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

export const getPackageChat = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const { pageId } = request.query;
    const doesPackageExist = await Package.findOne({ pageId });

    if (!doesPackageExist) {
      return response.status(404).json({ error: 'Package room not found.' });
    } else {
      const chatHistory = [...doesPackageExist.realtime?.chat!];
      response.status(200).json(chatHistory);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Could not GET chat history' });
  }
};
