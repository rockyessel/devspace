import { Request, Response } from 'express';
import { CustomRequest } from '../middleware/scrape-data';
import { Package } from '../models/packages';

export const add_package = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const user = request.user;

    console.log('request.data', request.data);
    const {
      package_name,
      keywords,
      license,
      version,
      description,
      total_downloads,
      links,
      owners,
      time_uploaded,
    } = request.data;


    const PackageData = await Package.create({
      package_name,
      keywords,
      license,
      version,
      description,
      total_downloads,
      links,
      owners,
      time_uploaded,
      addedBy_userId: user?._id,
      main_owner: [],
    });

    if (PackageData) {
      response.json(PackageData);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
