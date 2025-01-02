// Controller Layer untuk handle request dan response

const BranchRepository = require("./branch.repository");

const getAllBranch = async (req, res) => {
    try {
        const branch = await BranchRepository.getAllBranch();
    
        if(!branch) return res.status(404).send({
            message : "Branch Empty"
        })
    
        res.status(200).send({ 
            message: "Get All Branch Success",
            data : branch
        });
    } catch (error) {
        res.status(500).send({
            message : error.message
        })
    }
};

const getBranchById = async (req, res) => {
    try {
        const branch = await BranchRepository.getBranchById(parseInt(req.params.id));

        if(!branch) return res.status(404).send({
            message : "Branch Not Found"
        })
    
        res.status(200).send({
            message: "Get Branch Success",
            data : branch,
        });
    } catch (error) {
        res.status(500).send({
            message : error.message
        })
    }
}

const createBranch = async (req, res) => {

    const existBranch = await BranchRepository.getBranchByName(req.body.name);
    if(existBranch) return res.status(400).send({message : "Branch Name Already Exists"})


    try {
        const branch = await BranchRepository.createBranch(req.body);
        res.status(201).send({
            message : "Created Branch Success",
            data : branch
        })
    } catch (error) {
        res.status(400).send({
            message : error.message
        })
    }
}

const updateBranch = async (req, res) => {
    const findBranch = await BranchRepository.getBranchById(parseInt(req.params.id));
    if(!findBranch) return res.status(404).send({
        message : "Branch Not Found"
    })

    try {
        const branch = await BranchRepository.updateBranch(req.body,parseInt(req.params.id));
        res.status(201).send({
            message : "Updated Branch Success",
            data : branch
        })
    } catch (error) {
        res.status(400).send({
            message : error.message
        })
    }
}

const deleteBranch = async (req, res) => {
    const findBranch = await BranchRepository.getBranchById(parseInt(req.params.id));
    if(!findBranch) return res.status(404).send({
        message : "Branch Not Found"
    })

    try {
        const user = await BranchRepository.deleteBranch(parseInt(req.params.id));
        res.status(201).send({
            message : "Deleted Branch Success"
        })
    } catch (error) {
        res.status(400).send({
            message : error.message
        })
    }
}

module.exports = {
    getAllBranch,
    createBranch,
    getBranchById,
    updateBranch,
    deleteBranch
}