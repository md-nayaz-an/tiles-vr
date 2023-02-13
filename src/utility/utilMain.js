import { React } from 'react';

import TitlebarImageList from './imageList';
import ModelList from './modelList';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function Utils() {
  return(
    <div style={{overflow: "auto", height: '100%'}}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: '90vh', flexGrow: 1, maxWidth: '90%' }}
      >
        <TreeItem nodeId="1" label="Model"
          sx={{maxHeight: '40vh', flexGrow: 1}}
        >
          <ModelList />
        </TreeItem>
        <TreeItem nodeId="2" label="Textures"
          sx={{ maxHeight: '40%', flexGrow:1}}
        >
          <TitlebarImageList />
        </TreeItem>
      </TreeView>
    </div>
  )
}

export { Utils };
