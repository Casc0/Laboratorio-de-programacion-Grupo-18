import Panchitos.*;

import java.util.Random;

public class Panchero implements Runnable{

    @Override
    public void run() {
    }

    public Object elegirTopping(Venta pancho){
        int ingrediente = new Random().nextInt(3);
        switch(ingrediente) {
            case 0:
                pancho = new Ketchup(pancho);
                break;
            case 1:
                pancho = new Mayonesa(pancho);
                break;
            case 2:
                pancho = new Papitas(pancho);
                break;
        }
        return pancho;
    }
}
