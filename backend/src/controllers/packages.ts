import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/scrape-data';
import { Package } from '../models/packages';

export const add_package = async (request: CustomRequest, response: Response) => {
  try {
    const user = request.user;
    const PackageData = await Package.create({
      metaData: { ...request.data },
      addedBy_userId: user?._id,
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
export const getAllPackages = async (request: CustomRequest, response: Response) => {};






export const getPackage = async (request: CustomRequest, response: Response) => {
  try {
    const { language, name } = request.params;
    const findPackage = await Package.findOne({ 'metaData.package_name': name });

    if (findPackage) {
      return response.status(200).json(findPackage);
    }

    response.status(404).json({ error: "Package not found. Try importing it" });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
};