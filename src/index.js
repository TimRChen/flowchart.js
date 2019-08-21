import { Core, Node, Edge } from './core/index.js';
import { RSGraph } from './layout/index.js';

// normal export.
window.Core = Core;
window.Node = Node;
window.Edge = Edge;

// layout export.
window.RSGraph = RSGraph;

// es module.
export { Core, Node, Edge, RSGraph };
