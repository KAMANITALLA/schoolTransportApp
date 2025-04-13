type Arret = {
    id: number;
    intitule: string;
    latitude: number;
    longitude: number;
  };
  
  type Liaison = {
    idsource: number;
    iddestination: number;
    distance: number;
  };
  
  type Noeud = {
    id: number;
    parent: number | null;
    g: number;
    h: number;
    f: number;
  };
  
  function distance(a: Arret, b: Arret): number {
    const dx = a.latitude - b.latitude;
    const dy = a.longitude - b.longitude;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  export function astar(
    arrets: Arret[],
    liaisons: Liaison[],
    departId: number,
    destinationId: number
  ): number[] {
    const getArret = (id: number) => arrets.find((a) => a.id === id)!;
  
    const ouverts: Noeud[] = [{
      id: departId,
      parent: null,
      g: 0,
      h: distance(getArret(departId), getArret(destinationId)),
      f: 0
    }];
    ouverts[0].f = ouverts[0].g + ouverts[0].h;
  
    const fermes: Map<number, Noeud> = new Map();
  
    while (ouverts.length > 0) {
      // Trier les noeuds ouverts par coût total croissant
      ouverts.sort((a, b) => a.f - b.f);
      const courant = ouverts.shift()!;
      fermes.set(courant.id, courant);
  
      if (courant.id === destinationId) {
        // Reconstruction du chemin
        const chemin: number[] = [];
        let current: Noeud | undefined = courant;
        while (current) {
          chemin.unshift(current.id);
          current = fermes.get(current.parent!);
        }
        return chemin;
      }
  
      const voisins = liaisons
        .filter(l => l.idsource === courant.id)
        .map(l => ({
          id: l.iddestination,
          g: courant.g + l.distance,
          parent: courant.id,
        }));
  
      for (const voisin of voisins) {
        if (fermes.has(voisin.id)) continue;
  
        const h = distance(getArret(voisin.id), getArret(destinationId));
        const f = voisin.g + h;
  
        const existant = ouverts.find(n => n.id === voisin.id);
        if (!existant || voisin.g < existant.g) {
          if (existant) {
            existant.g = voisin.g;
            existant.f = f;
            existant.parent = courant.id;
          } else {
            ouverts.push({
              id: voisin.id,
              parent: courant.id,
              g: voisin.g,
              h,
              f
            });
          }
        }
      }
    }
  
    return []; // Aucun chemin trouvé
  }
  