import os
from FastSAM.fastsam import FastSAM, FastSAMPrompt

class FSAM:
    def __init__(self):
        self.DIR_PATH = os.path.dirname(os.path.realpath(__file__))
        self.model = FastSAM(f'{self.DIR_PATH}/FastSAM/weights/FastSAM_x.pt')
        self.IMAGE_PATH = './uploads/'
        self.DEVICE = 'cpu'

    def execute_fsam(self):
        result = {}
        for image in os.listdir(self.IMAGE_PATH):
            everything_results = self.model(self.IMAGE_PATH+image, device=self.DEVICE, retina_masks=True, imgsz=1024, conf=0.4, iou=0.9,)
            prompt_process = FastSAMPrompt(self.IMAGE_PATH+image, everything_results, device=self.DEVICE)
            ann = prompt_process.everything_prompt()
            prompt_process.plot(
                annotations=ann,
                output_path=f'{self.DIR_PATH}/output/{image}',
                mask_random_color=True,
                better_quality=True,
                retina=False,
                withContours=True,
            )
            output_path = f'{self.DIR_PATH}/output/{image}'
            bboxes = everything_results[0].boxes.xyxy
            bboxes = bboxes.cpu().numpy()
            bboxes = bboxes.tolist()
            result[f'{image}'] = {'bboxes': bboxes, 'output_path': output_path}
        return result

if __name__=="__main__":
    fs = FSAM()
    fs.execute_fsam()
