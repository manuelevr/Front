import { Box, Skeleton } from "@mui/material";
import React from "react";

type SkeletonLoaderProps = {
    count: number;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count }) => {
    const skeletonItems = Array.from({ length: count }, (_, index) => (
        <Box key={index} sx={{ width: '100%', textAlign: 'center', paddingY: '2px' }}>
            <Skeleton animation="wave" sx={{ marginX: 'auto', width: '90%', height: 50 }} />
        </Box>
    ));

    return <Box sx={{ width: "100%", marginBottom: 0 }}>{skeletonItems}</Box>;
};

export default SkeletonLoader;
