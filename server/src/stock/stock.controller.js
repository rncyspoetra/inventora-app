// Controller Layer untuk handle request dan response

const StockRepository = require("../stock/stock.repository")

// Update Stok
const updateStock = async (req, res) => {
    try {
        const { branchId, productId } = req.params;
        const { stockQuantity } = req.body;

        // Validasi input
        if (typeof stockQuantity !== 'number' || stockQuantity < 0) {
            return res.status(400).send({
                message: 'Invalid stock quantity. It must be a positive number.',
            });
        }

        // Find Stock By BranchId and ProductId
        const stock = await StockRepository.checkStock(branchId, productId);

        if (!stock) {
            return res.status(404).send({
                message: 'Stock not found for the specified branch and product.',
            });
        }

        // Update stok
        const updatedStock = await StockRepository.updateStock(stockQuantity, branchId, productId);

        res.status(200).send({
            message: 'Stock updated successfully.',
            data: updatedStock,
        });
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).send({
            message: 'An error occurred while updating the stock.',
            error: error.message,
        });
    }
};

module.exports = {
    updateStock
}