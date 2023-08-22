'use client'

import { importPackage } from '@/utils/services/api';
import React from 'react';

interface Props {}

const PackagePage = () => {
  return (
    <div>
      PackagePage
      <button onClick={() => importPackage('')}>Import Package</button>
    </div>
  );
};

export default PackagePage;
